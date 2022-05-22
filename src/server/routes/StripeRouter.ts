// Import Env
require('dotenv').config();

// Import Dependencies
import { Router } from 'express';
import express, { Express, Request, Response } from 'express';

// Set Up Router
const stripeRouter: Router = Router();

// Stripe Setup
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY); // ** NEED TO TURN INTO IMPORT STATEMENT
const storeItems = new Map([
  [1, { priceInCents: 48000, name: 'Spring Subscription' }],
  [2, { priceInCents: 480000, name: 'Fall Subscription' }],
  [3, { priceInCents: 200000, name: 'Winter Subscription' }],
]);

// Create a post request for /create-checkout-session
stripeRouter.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment', // subscriptions would be added here
      line_items: req.body.items.map((item: { id: number; quantity: any }) => {
        const storeItem: any = storeItems.get(item.id);
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.SERVER_URL}/orders-page`,
      cancel_url: `${process.env.SERVER_URL}/subscriptions-page`,
    });
    res.json({ url: session.url });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Export Router
export default stripeRouter;
