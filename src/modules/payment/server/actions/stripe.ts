'use server';

import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';

export async function fetchClientSecret(): Promise<string> {
  const origin = (await headers()).get('origin');

  const product = await stripe.products.create({
    name: 'T-shirt'
  });
  console.log('product', product);

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: 2000,
    currency: 'usd'
  });
  console.log('price', price);

  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    // payment_method_types:['']
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of
        // the product you want to sell
        price: price.id,
        quantity: 1
      }
    ],
    mode: 'payment',
    return_url: `${origin}/payment/return?session_id={CHECKOUT_SESSION_ID}`
  });

  return session.client_secret as string;
}
