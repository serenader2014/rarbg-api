const utils = require('./utils')
const constants = require('./constants')
const request = utils.request
const proceedExtraParams = utils.proceedExtraParams

module.exports = function list(options) {
  const extraParams = proceedExtraParams(options)
  return request(constants.BASE_URL, Object.assign({}, {
      mode: 'list',
    }, extraParams)).then(res => res.body.torrent_results)
}
