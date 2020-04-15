import { Connection } from "typeorm";

import { RSVP } from "../db/entity/rsvp";

export default async (connection: Connection, name: string): Promise<RSVP | undefined> => {
  const rsvps = await connection.manager.findOne(RSVP, { rsvpName: name.toUpperCase() });
  return rsvps;
};
