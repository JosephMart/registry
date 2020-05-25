import { NowRequest, NowResponse } from "@now/node";

import setHeaders from "../src/controllers/headers";

export default (req: NowRequest, res: NowResponse): void => {
  setHeaders(res);
  console.log("Pong!");
  res.json({ response: "Pong!" });
};
