var axios = require('axios');
const host = require('../settings/host');

module.exports = axios.create({
  baseURL: host.publicURL || `http://${host.hostname}:${host.port}`,
});
