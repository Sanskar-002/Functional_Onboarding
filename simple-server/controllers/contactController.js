module.exports = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <h1>Contact Form</h1>
    <form>
      <input type="text" placeholder="Your Name" />
      <input type="email" placeholder="Your Email" />
      <button type="submit">Send</button>
    </form>
  `);
};
