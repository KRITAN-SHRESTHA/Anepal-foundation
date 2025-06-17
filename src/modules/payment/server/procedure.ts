import { env } from '@/env';
import { createTRPCRouter, publicProcedure } from '@/trpc/init';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

interface PaypalOauthToken {
  scope: string;
  access_token: string;
  app_id: string;
  expires_in: number;
  nonce: string;
}

const authToken = Buffer.from(
  `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
).toString('base64');

export const paymentRoute = createTRPCRouter({
  createOrder: publicProcedure
    .input(
      z.object({
        amount: z.string(),
        currency_code: z.string().default('USD').optional()
      })
    )
    .mutation(async opts => {
      const {
        input: { amount, currency_code }
      } = opts;

      // 1️⃣ Get Access Token
      const tokenRes = await fetch(
        'https://api-m.sandbox.paypal.com/v1/oauth2/token',
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${authToken}`,
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

      const order = (await orderRes.json()) as {
        id: string;
        status: string; // PAYER_ACTION_REQUIRED
        links: {
          href: string;
          rel: string;
          method: string;
        }[];
      };

      return { order, access_token };
    }),

  confirmOrder: publicProcedure
    .input(
      z.object({
        orderId: z.string()
      })
    )
    .mutation(async otps => {
      const { orderId } = otps.input;

      // 1️⃣ Get Access Token
      const tokenRes = await fetch(
        'https://api-m.sandbox.paypal.com/v1/oauth2/token',
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${authToken}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: 'grant_type=client_credentials'
        }
      );

      const { access_token } = (await tokenRes.json()) as PaypalOauthToken;
      // will get order details
      const orderDetailsData = await fetch(
        `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      const orderDetails = await orderDetailsData.json();

      console.log('orderDetailsData-----------', orderDetails);

      if (!orderDetails) {
        return new TRPCError({
          code: 'NOT_FOUND',
          message: 'Order id not found'
        });
      }

      const data = await fetch(
        `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      const confirmData = await data.json();
      console.log('success data---------', confirmData);

      return confirmData;
    })
});
