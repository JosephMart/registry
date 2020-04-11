import { NowRequest, NowResponse } from "@now/node";
import "reflect-metadata";

import db from "../src/db";
import getRSVPS from "../src/controllers/getRSVPS";

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  const connection = await db();

  console.log("Loading RSVP from the database...");
  const rsvps = await getRSVPS(connection);
  await connection.close();
  res.json({ response: "Pong!", rsvps });
};
