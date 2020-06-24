import { Connection, ObjectID } from "typeorm";
import { GoogleSpreadsheet } from "google-spreadsheet";

import { Registered } from "../db/entity/registered";
import db from "../db";

type GoogleSheetRow = {
  ID: ObjectID;
  Name: string;
  Attending: number;
  "Registered By": string;
  Message: string;
  Timestamp: string;
};

/**
 * Connect to the GoogleSheet document
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSheet = async (): Promise<any> => {
  console.log("Getting the GoogleSpreadsheet");
  const doc = new GoogleSpreadsheet(process.env.SHEET_ID);

  console.log("Authing");
  await doc.useServiceAccountAuth({
    // eslint-disable-next-line @typescript-eslint/camelcase
    client_email: process.env.GOOGLE_SHEET_CLIENT_EMAIL,
    // eslint-disable-next-line @typescript-eslint/camelcase
    private_key: process.env.GOOGLE_SHEET_PRIVATE_KEY,
  });

  console.log("Loading doc info");
  await doc.loadInfo();
  console.log("Loaded doc info success");

  // First sheet is going to be "latest"
  const sheet = doc.sheetsByIndex[0];

  // Store the current headers for when we overwrite the sheet
  await sheet.loadHeaderRow();
  const headers = sheet.headerValues;

  // Commit changes to the GoogleSheet with a full wipe+update
  await sheet.clear();
  await sheet.setHeaderRow(headers);
  console.log("Done setting up sheet");
  return sheet;
};

/**
 * Get all registrations from DB
 * @param connection Active DB connection
 */
const getRegistrations = async (): Promise<[GoogleSheetRow[], Connection]> => {
  const connection = await db();
  const registrations = await connection.manager.find(Registered);
  // Convert all Registered rows into GoogleSheet rows
  const rowsToAdd = [];

  for (const r of registrations) {
    const attending = r.attending ? 1 : 0;
    for (const user of r.users) {
      const { rsvpUser } = r;
      rowsToAdd.push({
        ID: r._id,
        Name: user.name,
        Attending: attending,
        "Registered By": `${rsvpUser.firstName} ${rsvpUser.lastName}`,
        Message: r.message,
        Timestamp: new Date(r.timestamp).toLocaleString("en-US", { timeZone: "America/Chicago" }),
      });
    }
  }

  console.log(`Rows adding to GoogleSheet ${JSON.stringify(rowsToAdd)}`);
  return [rowsToAdd, connection];
};

/**
 * Main handler for fetching Registered info from DB and updating GoogleSheet
 */
export default async (): Promise<boolean> => {
  console.log("Starting to update GoogleSheet");
  console.log(JSON.stringify(process.env));

  // Load all deps in async, entries from DB and GoogleSheet info
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [[rowsToAdd, connection], sheet]: [[GoogleSheetRow[], Connection], any] = await Promise.all([
    getRegistrations(),
    getSheet(),
  ]);
  await Promise.all([sheet.addRows(rowsToAdd), connection.close()]);
  console.log("Success updating GoogleSheet");
  return true;
};
