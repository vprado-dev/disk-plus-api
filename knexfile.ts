import path from "path";

const MIGRATIONS_PATH = path.join(
  __dirname,
  "..",
  "..",
  "database",
  "migrations",
);
const MIN_POOL = 2;
const MAX_POOL = 20;

export const localProfile = {
  client: "pg",
  connection: {
    host: process.env.POSTGRES_HOST,
    port: +(process.env.POSTGRES_PORT as string),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database:
      process.env.NODE_ENV === "test"
        ? `test-${process.env.POSTGRES_DB}`
        : process.env.POSTGRES_DB,
  },
  pool: {
    min: MIN_POOL,
    max: MAX_POOL,
  },
  migrations: {
    directory: MIGRATIONS_PATH,
  },
};

export default {
  local: localProfile,
  staging: {},
  test: {},
  production: {}
};
