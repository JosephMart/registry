import { VercelRequest, VercelResponse } from "@vercel/node";

import setHeaders from "../src/controllers/headers";

export default (req: VercelRequest, res: VercelResponse): void => {
  setHeaders(res);
  console.log("Pong!");
  res.json({ response: "Pong!" });
};
