import type { NextApiRequest, NextApiResponse } from 'next';

type Response = {
  result: number
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  res.status(200).json({ result: 0 });
}
