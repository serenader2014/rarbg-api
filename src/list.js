const utils = require('./utils')
const constants = require('./constants')
const request = utils.request

module.exports = function list(options) {
  return request(constants.BASE_URL, {
    mode: 'list',
  }).then(res => res.body.torrent_results)
}
