import { Connection } from "typeorm";

import { RSVP } from "../db/entity/rsvp";

export default async (connection: Connection): Promise<RSVP[]> => {
  console.log("Loading RSVP from the database...");
  const rsvps = await connection.manager.find(RSVP);
  console.log("Loaded RSVPS: ", rsvps);
  return rsvps;
};
