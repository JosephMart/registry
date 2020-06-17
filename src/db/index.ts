import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { RSVP } from "./entity/rsvp";
import { Registered } from "./entity/registered";

export default (): Promise<Connection> =>
  createConnection({
    type: "mongodb",
    database: "wedding",
    entities: [RSVP, Registered],
    url: process.env.WEDDING_DB,
  });
