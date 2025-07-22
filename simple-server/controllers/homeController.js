module.exports = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Welcome to my Node.js server! This is the home page.');
};
