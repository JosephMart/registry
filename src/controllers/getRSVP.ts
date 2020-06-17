import { Connection } from "typeorm";

import { RSVP } from "../db/entity/rsvp";

export default async (connection: Connection, name: string): Promise<RSVP | undefined> => {
  const rsvpName = name.trim().toUpperCase();
  console.log(`Searching rsvpName: ${rsvpName}`);
  console.log(`DB URL: ${process.env.WEDDING_DB}`);
  const rsvp = await connection.manager.findOne(RSVP, { rsvpName });
  console.log(`Result: ${JSON.stringify(rsvp)}`);
  return rsvp;
};
