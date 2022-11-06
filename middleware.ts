import { NextRequest, NextResponse } from 'next/server';
import { redis } from './lib/redis';

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const parts = pathname.split('/');
  const shortUrl = parts[parts.length - 1];

  const longUrl = await redis.hget('links', shortUrl);
  if (longUrl) {
    const validUrl = getValidUrl(longUrl);
    return NextResponse.redirect(validUrl);
  } else NextResponse.redirect(req.nextUrl.origin);
}

const getValidUrl = (link: string) => {
  if (link.indexOf('http://') == 0 || link.indexOf('https://') == 0) {
    return link;
  } else return `https://${link}`;
};
