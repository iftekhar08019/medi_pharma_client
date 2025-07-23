// Example only. Skip if not using Mongoose.
const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
  user: String,
  amount: Number,
  status: { type: String, enum: ['paid', 'pending'], default: 'pending' },
  orderId: String,
  paymentIntentId: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Payment', paymentSchema); 
