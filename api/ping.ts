import { NowRequest, NowResponse } from "@now/node";

import setHeaders from "../src/controllers/headers";

export default (req: NowRequest, res: NowResponse): void => {
  setHeaders(res);
  console.log("Pong!");
  console.log(process.env);
  res.json({ response: "Pong!" });
};
