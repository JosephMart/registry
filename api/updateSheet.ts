import { VercelRequest, VercelResponse } from "@vercel/node";

import updateSheet from "../src/controllers/spreadsheet";
import setHeaders from "../src/controllers/headers";

export default async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  setHeaders(res);

  let result = false;
  try {
    result = await updateSheet();
  } catch (_e) {
    const e = _e as Error;
    console.log(e.message);
  }
  res.json({ response: result });
};
