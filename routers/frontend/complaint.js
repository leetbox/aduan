const router = require('express').Router();
const pay = require('../../libraries/senangpay');

router.get('/', async (req, res) => {
  // getting data from post

  // create complaint

  // pay
  const input = {
    name: 'Uvuvuwey',
    email: 'Ossas@gmail.com',
    phone: '60176712829',
    amount: 2,
    description: "wao",
    complaintId: "10010",
  };

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(pay.prepare(input).toString());
  res.end();
});

module.exports = router;
