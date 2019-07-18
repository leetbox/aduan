const router = require('express').Router();

router.get('/dashboard', (req, res) => {
  // origin hardcoded for now
  if (req.header('Referer') !== 'http://localhost:8181/utama') {
    res.status(400).end();
    return;
  }

  res.status(200).set({
    connection: 'keep-alive',
    'cache-control': 'no-cache',
    'content-Type': 'text/event-stream',
    'Access-Control-Allow-Origin': 'http://www.google.com'
  });

  setInterval(() => {
    res.write(`data: ${Math.random()}\n\n`);
  }, 2000);
});

module.exports = router;
