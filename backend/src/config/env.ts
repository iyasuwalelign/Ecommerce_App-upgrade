import dotenv from "dotenv";

dotenv.config();

 const ENV = {
  PORT: Number(process.env.PORT) || 3000,
  DB_URL: process.env.DB_URL!,
  NODE_ENV: process.env.NODE_ENV || "development",
  FRONTEND: process.env.FRONTEND!,
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY!,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY!,
};
export default ENV;
