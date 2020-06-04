import { NowRequest, NowResponse } from "@now/node";

import db from "../src/db";
import updateSheet from "../src/controllers/spreadsheet";
import setHeaders from "../src/controllers/headers";

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  setHeaders(res);

  const connection = await db();
  const result = await updateSheet(connection);
  await connection.close();
  res.json({ response: result });
};
