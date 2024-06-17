const express = require('express');
const Razorpay = require('razorpay');
const app = express();
const port = 3000;

// Replace with your actual Razorpay key ID and secret
const razorpay = new Razorpay({
  key_id: 'rzp_test_iEeFYSOWPaHGKZ',
  key_secret: '3GCwEs595wDvLPvY3NJeWXV5',
});

// Create an order
app.post('/createOrder', (req, res) => {
  const { amount, currency, receipt, notes } = req.body;

  razorpay.orders.create({
    amount,
    currency,
    receipt,
    notes,
  })
    .then((order) => {
      res.json(order);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Verify the payment
app.post('/verifyOrder', (req, res) => {
  const { payment_id, order_id, signature } = req.body;

  const expected_signature = razorpay.utility.sign(
    JSON.stringify({
      payment_id,
      order_id,
    }),
    razorpay.key_secret
  );

  if (expected_signature === signature) {
    res.json({ status: 'success' });
  } else {
    res.status(401).json({ status: 'failure' });
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
