import { Connection } from "typeorm";

import { RSVP } from "../db/entity/rsvp";
import { Registered } from "../db/entity/registered";

export type RegisterPayload = {
  rsvpName: string;
  message: string;
  users: [{ name: string }];
  attending: boolean;
};

export default async (connection: Connection, payload: RegisterPayload): Promise<Registered | undefined> => {
  const rsvp = await connection.manager.findOneOrFail(RSVP, { rsvpName: payload.rsvpName });

  const registered = new Registered();
  registered.rsvpUser = rsvp;
  registered.message = payload.message;
  registered.users = payload.users;
  registered.attending = payload.attending;
  registered.timestamp = new Date();

  return await connection.manager.save(registered);
};
