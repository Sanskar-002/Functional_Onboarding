const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const { url } = req;

 
  if (url.startsWith('/public/')) {
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
    return;
  }

 
  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to my Node.js server!');
  } else if (url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hii this is my first Node.js server');
  } else if (url === '/contact') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <head><title>Contact</title></head>
        <body>
          <h1>Contact Me</h1>
          <form action="/submit" method="post">
            <label>Name: <input type="text" name="name" /></label><br/>
            <label>Email: <input type="email" name="email" /></label><br/>
            <input type="submit" value="Submit" />
          </form>
          <img src="/public/contact.png" alt="Contact Image" width="300" />
        </body>
      </html>
    `);
  } else {
    // 404 route
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Page Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
