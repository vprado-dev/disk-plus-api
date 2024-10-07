import knex, { Knex } from "knex";
import knexfile from "../../knexfile";

export const init = (opts: Knex.Config) => {
  const conn = knex(opts);

  return conn;
};

const initConnection = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return init(knexfile.local);
    default:
      return init(knexfile[process.env.NODE_ENV]);
  }
};

export const primary = initConnection();
