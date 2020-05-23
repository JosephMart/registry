import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { RSVP } from "./entity/rsvp";

export default (): Promise<Connection> =>
  createConnection({
    type: "mongodb",
    database: "wedding",
    entities: [RSVP],
    url: process.env.WEDDING_DB,
  });
