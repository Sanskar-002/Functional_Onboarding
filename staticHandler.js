// Static file handler module
const fs = require('fs');
const path = require('path');

function staticHandler(req, res) {
  const { url } = req;
  const filePath = path.join(__dirname, url);
  const ext = path.extname(filePath).toLowerCase();

  const contentType = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.css': 'text/css',
    '.js': 'application/javascript',
  }[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 - File Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

module.exports = staticHandler;
