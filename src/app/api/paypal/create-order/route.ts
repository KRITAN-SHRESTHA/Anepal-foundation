import { env } from '@/env';
import { NextRequest, NextResponse } from 'next/server';

interface PaypalOauthToken {
  scope: string;
  access_token: string;
  app_id: string;
  expires_in: number;
  nonce: string;
}

export async function POST(req: NextRequest) {
  const { amount, currency_code } = await req.json();

  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
  ).toString('base64');

  // 1️⃣ Get Access Token
  const tokenRes = await fetch(
    'https://api-m.sandbox.paypal.com/v1/oauth2/token',
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    }
  );

  const { access_token } = (await tokenRes.json()) as PaypalOauthToken;

  // 2️⃣ Create Order
  // https://developer.paypal.com/docs/api/orders/v2/#orders_create
  const orderRes = await fetch(
    'https://api-m.sandbox.paypal.com/v2/checkout/orders',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency_code, //'USD',
              value: amount
            }
          }
        ],
        payment_source: {
          paypal: {
            experience_context: {
              payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
              landing_page: 'GUEST_CHECKOUT', // GUEST_CHECKOUT | LOGIN | NO_PREFERENCE
              shipping_preference: 'NO_SHIPPING', // GET_FROM_FILE | NO_SHIPPING | SET_PROVIDED_ADDRESS
              user_action: 'PAY_NOW',
              return_url: `${env.NEXT_PUBLIC_APP_URL}/payment/success`,
              cancel_url: `${env.NEXT_PUBLIC_APP_URL}/payment/cancel`
            }
          }
        }
      })
    }
  );

  const order = await orderRes.json();

  return NextResponse.json(order, { status: 200 });
}
