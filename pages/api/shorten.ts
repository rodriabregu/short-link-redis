import { NextApiRequest, NextApiResponse } from 'next';
import { redis } from '../../lib/redis';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { longUrl } = req.body;

  if (!longUrl || longUrl.length <= 0)
    return res.status(400).json({ error: 'Error: The url is not set.' });

  const shortUrl = makeShortUrl(4);
  await redis.hset('links', { [shortUrl]: longUrl });
  res.status(200).json({ status: 'Success!' });
}

const makeShortUrl = (length: number) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
