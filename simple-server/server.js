const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();
const PORT = 3000;

// Serve static files from the public directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Use modular routes
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
