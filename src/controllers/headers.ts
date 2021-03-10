import { VercelResponse } from "@vercel/node";

export default (res: VercelResponse): void => {
  [
    ["Access-Control-Allow-Origin", "*"],
    ["Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"],
    ["Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept"],
  ].map(([a, b]) => res.setHeader(a, b));
};
