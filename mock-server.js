const express = require('express');

const app = express();

app.use(express.json());

console.log('Starting Mock Server...');

app.post('/payment/settled', (req, res) => {
  console.log('Settled API Hit');
  res.status(200).json({
    status: 'SETTLED',
    transactionId: 'TXN12345',
    message: 'Transfer Complete'
  });
});

app.post('/payment/failed', (req, res) => {
  console.log('Failed API Hit');
  res.status(400).json({
    status: 'FAILED',
    message: 'Insufficient Funds'
  });
});

app.post('/payment/timeout', (req, res) => {
  console.log('Timeout API Hit');

  setTimeout(() => {
    res.status(504).json({
      status: 'TIMEOUT',
      message: 'Request Timed Out'
    });
  }, 5000);
});

app.listen(3001, () => {
  console.log('Mock server running on port 3001');
});