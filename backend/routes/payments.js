const express = require('express');
const router = express.Router();

module.exports = (database) => {
  const paymentsCollection = database.collection('payments');

  router.post('/', async (req, res) => {
    try {
      const payment = req.body;
      const result = await paymentsCollection.insertOne(payment);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}; 
