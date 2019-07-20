const router = require('express').Router();
const cote = require('cote');

const subs = require('../libraries/pubsub');

const liveSettings = require('../settings/live.json');

router.get('/dashboard', (req, res) => {
  if (!liveSettings.dashboard.url.includes(req.header('Referer'))) {
    res.status(400).end();
    return;
  }

  res.status(200).set({
    connection: 'keep-alive',
    'cache-control': 'no-cache',
    'content-Type': 'text/event-stream',
    // 'Access-Control-Allow-Origin': 'place-url'
  });

  subs.on('dashboard.update', (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  });
});

router.get('/notify', (req, res) => {
  if (!liveSettings.notification.url.includes(req.header('Referer'))) {
    res.status(400).end();
    return;
  }

  res.status(200).set({
    connection: 'keep-alive',
    'cache-control': 'no-cache',
    'content-Type': 'text/event-stream',
  });

  subs.on('notification.update', (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  });
});

module.exports = router;
