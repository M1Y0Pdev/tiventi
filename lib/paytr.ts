import crypto from 'crypto';

interface PayTRProduct {
  name: string;
  price: number;
  qty: number;
}

interface PayTRCustomer {
  email: string;
  name: string;
  surname: string;
  phone: string;
}

interface PayTRAddress {
  address: string;
  city: string;
  district: string; // State or province
}

export function generatePayTRParameters(
  orderId: number,
  totalAmount: number, // in cents/kurus
  products: PayTRProduct[],
  customer: PayTRCustomer,
  address: PayTRAddress,
  userIp: string,
  currency: string = 'TL',
  lang: string = 'tr'
) {
  const merchantId = process.env.PAYTR_MERCHANT_ID;
  const merchantKey = process.env.PAYTR_MERCHANT_KEY;
  const merchantSalt = process.env.PAYTR_MERCHANT_SALT;
  const paytrPaymentUrl = 'https://www.paytr.com/odeme/api/get-token'; // Or direct form post URL

  if (!merchantId || !merchantKey || !merchantSalt) {
    throw new Error('PayTR merchant ID, Key, or Salt are not defined in environment variables.');
  }

  // Convert product details to PayTR's required format
  const userBasket = products.map(p => [`${p.name}`, `${p.price}`, p.qty]).flat();
  
  // Prepare required parameters
  const params = {
    merchant_id: merchantId,
    user_ip: userIp, // User IP address
    merchant_oid: orderId.toString(), // Unique Order ID from your system
    email: customer.email,
    payment_amount: totalAmount.toString(), // Total payment amount in kurus/cents
    payment_type: 'card', // 'card' for credit/debit card payments
    installment_count: '', // Leave empty for single payment, otherwise specify
    currency: currency,
    test_mode: process.env.NODE_ENV !== 'production' ? '1' : '0', // 1 for test, 0 for live
    user_basket: Buffer.from(JSON.stringify(userBasket)).toString('base64'),
    user_name: `${customer.name} ${customer.surname}`,
    user_address: address.address,
    user_phone: customer.phone,
    merchant_ok_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?orderId=${orderId}`, // Success callback URL
    merchant_fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/fail?orderId=${orderId}`, // Failure callback URL
    timeout_limit: '30', // Max 30 minutes
    debug_on: process.env.NODE_ENV !== 'production' ? '1' : '0',
    hash_params_str: '', // Will be filled below
    paytr_token: '', // Will be filled below
  };

  // Generate hash string
  const hashStr = `${params.merchant_id}${params.user_ip}${params.merchant_oid}${params.email}${params.payment_amount}${params.user_basket}${params.installment_count}${params.currency}${params.test_mode}`;

  const paytrToken = generatePayTRHash(hashStr, merchantKey, merchantSalt);
  params.paytr_token = paytrToken;

  return params;
}

export function generatePayTRHash(
  hashString: string,
  merchantKey: string,
  merchantSalt: string
): string {
  // Concat hash string with merchant_salt
  const combinedString = `${hashString}${merchantSalt}`;

  // HMAC SHA256 hashing
  const hmac = crypto.createHmac('sha256', merchantKey);
  const hash = hmac.update(combinedString).digest('base64');

  return hash;
}

// Function to verify PayTR callback (IPN) hash
export function verifyPayTRCallback(
  merchantOid: string,
  status: string,
  totalAmount: string,
  hash: string,
  merchantKey: string,
  merchantSalt: string
): boolean {
  const hashStr = `${merchantOid}${totalAmount}${status}${merchantSalt}`;
  const generatedHash = generatePayTRHash(hashStr, merchantKey, merchantSalt);
  return generatedHash === hash;
}
