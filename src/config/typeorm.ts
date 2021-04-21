import { createConnection } from "typeorm";
import path from "path";

export const connect = async () => {
  await createConnection({
    type: "mysql",
    database: "graphqlts",
    username: "root",
    password: "123123",
    host: "localhost",
    port: 3306,
    logging: true,
    synchronize: true,
    entities: [path.join(__dirname, "../entity/**/**.ts")],
  });

  console.log("Database is connected");
};
