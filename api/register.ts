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
    res.json({ success: false, msg: "Looks like Joseph messed up..." });
    return;
  }

  console.log(`Registering payload: ${JSON.stringify(payload)}`);

  const connection = await db();
  const data = await register(connection, payload);
  await connection.close();

  if (data === undefined) {
    res.json({ success: false, data, msg: `Looks like Joseph messed up...` });
    return;
  }

  const msg = data.attending
    ? `We look forward to seeing you ${data.rsvpUser.firstName} ${data.rsvpUser.lastName}!`
    : `We appreciate you taking the time to respond!`;

  res.json({
    success: true,
    data,
    msg,
  });
};
