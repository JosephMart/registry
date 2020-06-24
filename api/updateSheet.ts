import { NowRequest, NowResponse } from "@now/node";

import db from "../src/db";
import updateSheet from "../src/controllers/spreadsheet";
import setHeaders from "../src/controllers/headers";

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  setHeaders(res);

  const connection = await db();
  let result = false;
  try {
    result = await updateSheet(connection);
  } catch (_e) {
    const e = _e as Error;
    console.log(e.message);
  }
  await connection.close();
  res.json({ response: result });
};