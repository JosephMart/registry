import { NowRequest, NowResponse } from "@now/node";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "../src/entity/User";

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  const connection = await createConnection({
    type: "mongodb",
    database: "wedding",
    entities: [User],
    url: process.env.MONGODB_URL,
  });

  console.log("Loading users from the database...");
  const users = await connection.manager.find(User);
  console.log("Loaded users: ", users);
  await connection.close();
  res.json({ response: "Pong!", users });
};
