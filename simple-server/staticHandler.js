// Static file handler module
const fs = require('fs');
const path = require('path');


function staticHandler(req, res) {
  // Always serve contact.png from the public directory
  const filePath = path.join(__dirname, 'public', 'contact.png');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 - File Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': 'image/png' });
      res.end(data);
    }
  });
}

module.exports = staticHandler;
