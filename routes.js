// Route handler module
const staticHandler = require('./staticHandler');

function handleRoutes(req, res) {
  const { url } = req;

  if (url.startsWith('/public/')) {
    staticHandler(req, res);
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
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Page Not Found');
  }
}

module.exports = handleRoutes;
