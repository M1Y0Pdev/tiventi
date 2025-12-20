import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifyPayTRCallback } from '@/lib/paytr';

export async function POST(request: Request) {
  const supabase = createClient();

  const merchantId = process.env.PAYTR_MERCHANT_ID;
  const merchantKey = process.env.PAYTR_MERCHANT_KEY;
  const merchantSalt = process.env.PAYTR_MERCHANT_SALT;

  if (!merchantId || !merchantKey || !merchantSalt) {
    console.error('PayTR merchant ID, Key, or Salt are not defined in environment variables.');
    return NextResponse.json({ message: 'PayTR configuration error.' }, { status: 500 });
  }

  const formData = await request.formData();
  const post = Object.fromEntries(formData.entries());

  const merchant_oid = post.merchant_oid as string;
  const status = post.status as string; // 1: successful, 2: failed, 3: chargeback
  const total_amount = post.total_amount as string;
  const hash = post.hash as string;
  const payment_amount = post.payment_amount as string;
  const payment_type = post.payment_type as string;
  const installment = post.installment as string;
  const payment_id = post.payment_id as string;
  const errorCode = post['err_code'] as string;
  const errorMessage = post['err_msg'] as string;

  // 1. Verify PayTR callback hash
  const isValidHash = verifyPayTRCallback(
    merchant_oid,
    status,
    total_amount,
    hash,
    merchantKey,
    merchantSalt
  );

  if (!isValidHash) {
    console.error(`PayTR Callback: Hash verification failed for order ${merchant_oid}.`);
    return new Response('HASH_FAILURE', { status: 403 }); // Return HASH_FAILURE to PayTR
  }

  // 2. Update order status in your database
  let orderStatus: string;
  let paymentStatus: string;

  switch (status) {
    case '1':
      orderStatus = 'processing';
      paymentStatus = 'paid';
      break;
    case '2':
      orderStatus = 'cancelled'; // Or 'failed'
      paymentStatus = 'failed';
      break;
    case '3':
      orderStatus = 'cancelled'; // Or 'chargeback'
      paymentStatus = 'chargeback';
      break;
    default:
      orderStatus = 'pending';
      paymentStatus = 'unknown';
  }

  const { error: updateError } = await supabase
    .from('orders')
    .update({ 
      status: orderStatus,
      payment_status: paymentStatus,
      payment_id: payment_id,
      payment_type: payment_type,
      installment: installment,
      paytr_error_code: errorCode,
      paytr_error_message: errorMessage,
    })
    .eq('id', parseInt(merchant_oid)); // merchant_oid is our order ID

  if (updateError) {
    console.error(`Error updating order ${merchant_oid} in DB:`, updateError);
    return new Response('DB_UPDATE_FAILURE', { status: 500 }); // Return DB_UPDATE_FAILURE to PayTR
  }
  
  // Revalidate paths for updated order (e.g., account page order history)


  // 3. Return 'OK' to PayTR to confirm successful processing
  return new Response('OK', { status: 200 });
}
