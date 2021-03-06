import fs from "fs";
import path from "path";
import parse from "csv-parse";

import db from "../db";
import { RSVP } from "../db/entity/rsvp";

enum Columns {
  Count,
  Family,
  FirstName,
  LastName,
  Head,
}

const getFiles = (p: string): string[] => {
  return fs.readdirSync(p).map(file => path.join(p, file));
};

const handleFile = async (csv: string): Promise<RSVP[]> => {
  const data = fs.readFileSync(csv).toString();
  // eslint-disable-next-line @typescript-eslint/camelcase
  const csvRecords = parse(data, { skip_empty_lines: true, from_line: 2 });
  const dbRecords: RSVP[] = [];

  for await (const record of csvRecords) {
    const firstName = record[Columns.FirstName].trim();
    const lastName = record[Columns.LastName].trim();
    const rsvpName = `${firstName} ${lastName}`.toUpperCase();

    const r = new RSVP();
    r.firstName = firstName;
    r.lastName = lastName;
    r.rsvpName = rsvpName;

    if (r.firstName === "" || r.lastName === "") {
      console.warn("EMPTY name found!");
    } else {
      console.log(`${r.rsvpName}`);
      dbRecords.push(r);
    }
  }
  return dbRecords;
};

const commitToDB = async (records: RSVP[]): Promise<void> => {
  const connection = await (await db()).getRepository(RSVP);

  for (const rsvp of records) {
    // where the heck is findOneAndUpdate?????
    const criteria = { rsvpName: rsvp.rsvpName };

    try {
      await connection.manager.findOneOrFail(RSVP, criteria);
      // console.log(`Updating entity: ${rsvp.rsvpName}`);
      // await connection.manager.update(RSVP, criteria, rsvp);
    } catch (_e) {
      const e = _e as Error;
      console.log(`New RSVP ENTRY: ${rsvp.rsvpName}`);
      await connection.manager.save(RSVP, rsvp);
    }
  }
};

const main = async (): Promise<void> => {
  const folderPath = process.argv[2];
  const csvFiles = getFiles(folderPath);
  const futures = [];

  for (const csv of csvFiles) {
    futures.push(handleFile(csv));
  }

  const dbRecords = (await Promise.all(futures)).flat();
  await commitToDB(dbRecords);

  process.exit(0);
};

/**
 * Run main
 */
main();
