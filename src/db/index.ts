import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { RSVP } from "./entity/rsvp";
import { Registered } from "./entity/registered";

export default (): Promise<Connection> =>
  createConnection({
    type: "mongodb",
    database: "wedding",
    entities: [RSVP, Registered],
    url: "mongodb+srv://r0s:loki@cluster0-j89nv.mongodb.net/wedding",
    // url: process.env.WEDDING_DB,
  });
