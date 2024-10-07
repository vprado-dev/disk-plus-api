import { endpoint } from "../functions/endpoint";
import { HttpError } from "../utils/httpError";
import jwt from "jsonwebtoken";

const TOKEN_PREFIX = `Bearer `;

const createInternalAuth = (token: string) =>
  endpoint(async (req, res, next) => {
    const authHeader = req.headers["authorization"] || "";

    if (!authHeader || !authHeader.startsWith(TOKEN_PREFIX)) {
      res.set("WWW-Authenticate", "Bearer");
      throw new HttpError(401, "Unauthorized");
    }

    const requestToken = authHeader.split(TOKEN_PREFIX)[1];

    if (requestToken !== token) {
      throw new HttpError(401, "Unauthorized");
    }

    next();
  });

const tokenAuth = endpoint((req, res, next) => {
  const authHeader = req.headers["authorization"] || "";

  if (!authHeader || !authHeader.startsWith(TOKEN_PREFIX)) {
    res.set("WWW-Authenticate", "Bearer");
    throw new HttpError(401, "Unauthorized");
  }

  const requestToken = authHeader.split(TOKEN_PREFIX)[1];

  jwt.verify(
    requestToken,
    process.env.JWT_SECRET as string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err: any, _user: any) => {
      if (err) throw new HttpError(403, "Forbidden");
      next();
    },
  );
});

export const internalAuth = createInternalAuth(process.env.API_TOKEN!);

export const auth = tokenAuth
