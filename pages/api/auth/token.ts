import type { NextApiRequest, NextApiResponse } from "next";
import { generate } from "lib/jwt";
import { Auth } from "lib/auth";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const respuesta = await Auth.findByEmailAndCode(
    req.body.email,
    req.body.code
  );
  const token = generate({ userId: respuesta.data.userId });
  res.send({ token });
}
