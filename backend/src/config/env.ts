import dotenv from "dotenv";

dotenv.config();

if (!process.env.DB_URL) throw new Error("DB_URL is required");
if (!process.env.FRONTEND) throw new Error("FRONTEND is required");

const ENV = {
  PORT: Number(process.env.PORT) || 3000,
  DB_URL: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV || "development",
  FRONTEND: process.env.FRONTEND,
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY || "",
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || "",
};

export default ENV;