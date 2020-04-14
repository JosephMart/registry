import { NowResponse } from "@now/node";

export default (res: NowResponse) => {
  [
    ["Access-Control-Allow-Origin", "*"],
    ["Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"],
    ["Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept"],
  ].map(([a, b]) => res.setHeader(a, b));
};
