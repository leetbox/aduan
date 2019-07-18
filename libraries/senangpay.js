const crypto = require('crypto');

const settings = require('../settings/senangpay.json');

exports.prepare = (input) => {
  const {
    name,
    email,
    phone,
    amount,
    description,
    complaintId,
  } = input;

  const detail = description;
  const order_id = complaintId;


  const preHash = `${settings.secretKey}${description}${amount}${complaintId}`
  const hash = crypto.createHash('md5').update(preHash).digest('hex');

  const requestURL = `${settings.url}${settings.merchantId}`;

  return `
    <html>
      <body onload="document.order.submit()">
          <form name="order" method="post" action="${requestURL}">
              <input type="hidden" name="detail" value="${detail}">
              <input type="hidden" name="amount" value="${amount}">
              <input type="hidden" name="order_id" value="${order_id}">
              <input type="hidden" name="name" value="${name}">
              <input type="hidden" name="email" value="${email}">
              <input type="hidden" name="phone" value="${phone}">
              <input type="hidden" name="hash" value="${hash}">
          </form>
      </body>
    </html>
  `;
};
