module.exports = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hii Welcome to my About Page - This is a simple HTTP server');
};
