import "reflect-metadata";
import { NowRequest, NowResponse } from "@now/node";

import db from "../src/db";
import register, { RegisterPayload } from "../src/controllers/register";
import setHeaders from "../src/controllers/headers";

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  setHeaders(res);
  if (!req.body) {
    console.log("Register no op...");
    res.json({ success: false });
    return;
  }

  let payload = null;

  try {
    payload = req.body as RegisterPayload;
  } catch (e) {
    res.json({ success: false, msg: "Malformed payload" });
    return;
  }

  console.log(`Registering payload: ${JSON.stringify(payload)}`);

  const connection = await db();
  const data = await register(connection, payload);

  await connection.close();
  res.json({ success: true, data });
};
