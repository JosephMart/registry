import { VercelRequest, VercelResponse } from "@vercel/node";
import "reflect-metadata";

import db from "../src/db";
import getRSVP from "../src/controllers/getRSVP";
import setHeaders from "../src/controllers/headers";

export default async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  setHeaders(res);
  const connection = await db();

  console.log("Loading RSVP from the database...");
  const rsvp = await getRSVP(connection, req.query.name as string);
  await connection.close();
  res.json({ success: rsvp !== undefined, rsvp });
};
