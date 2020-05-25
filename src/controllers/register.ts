import { Connection } from "typeorm";

import { RSVP } from "../db/entity/rsvp";
import { Registered, RegisteredPerson } from "../db/entity/registered";

export type RegisterPayload = {
  rsvpName: string;
  users: RegisteredPerson[];
};

export default async (connection: Connection, payload: RegisterPayload): Promise<Registered | undefined> => {
  const rsvp = await connection.manager.findOneOrFail(RSVP, { rsvpName: payload.rsvpName });

  const registered = new Registered();
  registered.rsvpUser = rsvp;
  registered.users = payload.users;

  return await connection.manager.save(registered);
};
