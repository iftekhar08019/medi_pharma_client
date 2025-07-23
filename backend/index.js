const paymentsRoute = require('./routes/payments');
app.use('/payments', paymentsRoute(database)); 
