import { Connection } from "typeorm";

import { RSVP } from "../db/entity/rsvp";

export default async (connection: Connection, name: string): Promise<RSVP | undefined> => {
  console.log(`Searching rsvpName: ${name.toUpperCase()}`);
  console.log(`DB URL: ${process.env.MONGODB_URL}`);
  const rsvp = await connection.manager.findOne(RSVP, { rsvpName: name.toUpperCase() });
  console.log(`Result: ${rsvp}`);
  return rsvp;
};
