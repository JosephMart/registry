import { NowRequest, NowResponse } from "@now/node";
import "reflect-metadata";

import db from "../src/db";
import getRSVP from "../src/controllers/getRSVP";
import setHeaders from "../src/controllers/headers";

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  setHeaders(res);
  const connection = await db();

  console.log("Loading RSVP from the database...");
  console.log(req.query);
  const rsvp = await getRSVP(connection, req.query.name as string);
  await connection.close();
  res.json({ success: rsvp !== undefined, rsvp });
};
