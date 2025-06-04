import type { NextApiRequest, NextApiResponse } from "next";
import { Auth } from "lib/auth";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const gonza = new Auth("ZRuqaBgrvm2UKgeXa9J4");
  await gonza.pull();
  gonza.data.test = "dato hacia la base";
  await gonza.push();
  res.send(gonza.data);
}
