import type { NextApiRequest, NextApiResponse } from "next";
import { generate } from "lib/jwt";
import { Auth } from "lib/auth";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email, codefront } = req.body;
  console.log(codefront);
  const auth = await Auth.findByEmail(email);
  const { code, expires, userId } = auth.data;
  console.log(code);
  if (codefront !== code) {
    res.status(401).send({ error: "código inválido" });
    return;
  }
  const now = new Date();
  const expiresDate = new Date(expires);
  if (expiresDate.getTime() < now.getTime()) {
    res.status(401).send({ error: "Código expirado" });
    return;
  }
  var token = generate({ userId });
  // const userId = await getIdfromMail(email);
  res.status(200).send({ token: token });
  // res.send({ token: token });
}
