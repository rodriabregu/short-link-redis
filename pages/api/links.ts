import { NextApiRequest, NextApiResponse } from 'next';
import { redis } from '../../lib/redis';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const links = (await redis.hgetall('links')) || [];
  res.status(200).json({ links });
}
