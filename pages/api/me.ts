import type { NextApiRequest, NextApiResponse } from "next";
import parseToken from "parse-bearer-token";
import { decode } from "lib/jwt";
function handler(req: NextApiRequest, res: NextApiResponse, token) {
  res.send({ todoOk: true });
}

function authMiddleware(callback) {
  return function (req: NextApiRequest, res: NextApiResponse) {
    const token = parseToken(req);
    if (!token) {
      res.status(401).send({ message: "no hay token" });
    }
    const decodedToken = decode(token);
    console.log(decodedToken);
    if (decodedToken) {
      callback(req, res, decodedToken);
    } else {
      res.status(401).send({ message: "token incorrecto" });
    }
  };
}

export default authMiddleware(handler);
