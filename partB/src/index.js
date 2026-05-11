const express = require('express');
const cors = require('cors');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/books',   require('./routes/books'));
app.use('/api/v1/members', require('./routes/members'));
app.use('/api/v1/loans',   require('./routes/loans'));

// Health check
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok', message: 'Mini Library API running' });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Mini Library API running on http://localhost:${PORT}`);
  });
}

module.exports = app;
