import { NowRequest, NowResponse } from "@now/node";
import "reflect-metadata";

// import db from "../src/db";
// import getRSVPS from "../src/controllers/getRSVP";
import setHeaders from "../src/controllers/headers";

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  setHeaders(res);
  // const connection = await db();

  console.log("Loading RSVP from the database...");
  // const rsvps = await getRSVPS(connection);
  // await connection.close();
  res.json({ response: "Pong!" });
};
