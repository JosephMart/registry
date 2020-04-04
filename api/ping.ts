import { NowRequest, NowResponse } from "@now/node";

export default (req: NowRequest, res: NowResponse): void => {
  res.json({ response: "Pong!" });
};
