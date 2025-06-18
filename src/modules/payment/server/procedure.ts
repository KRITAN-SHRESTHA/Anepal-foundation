import { env } from '@/env';
import { createTRPCRouter, publicProcedure } from '@/trpc/init';
import { CreateOrderRequestBody, OrderResponseBody } from '@paypal/paypal-js';
import { TRPCError } from '@trpc/server';
import { cache } from 'react';
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

const getAccessToken = cache(async () => {
  const accessTokenRes = await fetch(
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

  const { access_token } = (await accessTokenRes.json()) as PaypalOauthToken;

  return access_token;
});

export const paymentRoute = createTRPCRouter({
  generateClientToken: publicProcedure.query(async () => {
    // 1️⃣ Get Access Token
    const access_token = await getAccessToken();

    // 2️⃣ Generate client token
    const tokenRes = await fetch(
      'https://api-m.sandbox.paypal.com/v1/identity/generate-token',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const token = (await tokenRes.json()) as {
      client_token: string;
      expires_in: 3600;
    };

    return token;
  }),

  createOrder: publicProcedure
    .input(
      z.object({
        amount: z.string(),
        currency_code: z.string()
      })
    )
    .mutation(async opts => {
      const { amount, currency_code } = opts.input;

      // const res = await fetch('https://ipapi.co/json/');
      // const { currency } = (await res.json()) as {
      //   currency: string;
      // };

      // 1️⃣ Get Access Token
      const access_token = await getAccessToken();

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
                  currency_code: currency_code, //defualt USD
                  value: amount
                }
              }
            ],
            // payment_source: {
            //   paypal: {
            //     experience_context: {
            //       payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
            //       landing_page: 'GUEST_CHECKOUT', // GUEST_CHECKOUT | LOGIN | NO_PREFERENCE
            //       shipping_preference: 'NO_SHIPPING', // GET_FROM_FILE | NO_SHIPPING | SET_PROVIDED_ADDRESS
            //       user_action: 'PAY_NOW',
            //       return_url: `${env.NEXT_PUBLIC_APP_URL}/payment/success`,
            //       cancel_url: `${env.NEXT_PUBLIC_APP_URL}/payment/cancel`
            //     }
            //   }
            // },
            application_context: {
              return_url: `${env.NEXT_PUBLIC_APP_URL}/payment/success`,
              cancel_url: `${env.NEXT_PUBLIC_APP_URL}/payment/cancel`
            }
          } satisfies CreateOrderRequestBody)
        }
      );

      const order = (await orderRes.json()) as OrderResponseBody;

      return order;
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
      const access_token = await getAccessToken();
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
