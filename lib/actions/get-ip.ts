'use server'

import { headers } from 'next/headers';

export async function getUserIp() {
  const headersList = headers();
  const xForwardedFor = headersList.get('x-forwarded-for');
  const userIp = xForwardedFor ? xForwardedFor.split(',')[0] : '127.0.0.1'; // Use 127.0.0.1 as fallback
  return userIp;
}
