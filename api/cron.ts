import { NowRequest, NowResponse } from "@now/node";
import http from "http";

// import setHeaders from "../src/controllers/headers";

export default (req: NowRequest, res: NowResponse): void => {
  var options = {
    host: "localhost",
    port: 3000,
    path: "/api/updateSheet",
    // timeout: 3000,
  };

  const r = http.get(options, function (res) {
    console.log("STATUS: " + res.statusCode);
    console.log("HEADERS: " + JSON.stringify(res.headers));
    res.setEncoding("utf8");
    res.on("data", function (chunk) {
      console.log("BODY: " + chunk);
    });
  });

  r.on("error", function (e) {
    console.log("ERROR: " + e.message);
  });

  res.json({ response: true });
};
