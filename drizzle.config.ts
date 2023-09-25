import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  driver: "mysql2",
  dbCredentials: {
    connectionString:
      "mysql://root:fuIQiSHzqNmJFiaueXq7@containers-us-west-65.railway.app:7742/railway",
  },
} satisfies Config;
