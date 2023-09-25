import * as schema from "./schema";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const poolConnection = mysql.createPool({
  uri: "mysql://root:fuIQiSHzqNmJFiaueXq7@containers-us-west-65.railway.app:7742/railway",
});

export const db = drizzle(poolConnection, { schema, mode: "default" });
