const http = require('http');
const PORT = 3000;
const handleRoutes = require('./routes');

const server = http.createServer((req, res) => {
  handleRoutes(req, res);
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
