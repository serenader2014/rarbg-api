const utils = require('./utils')
const constants = require('./constants')
const request = utils.request
const proceedExtraParams = utils.proceedExtraParams

module.exports = function search(keyword, options, type) {
  const searchParams = {}
  if (type && ~['imdb', 'tvdb', 'themoviedb', 'tvrage'].indexOf(type)) {
    searchParams[`search_${type}`] = keyword
  } else {
    searchParams.search_string = keyword
  }
  const extraParams = proceedExtraParams(options)
  return request(constants.BASE_URL, Object.assign({}, {
      mode: 'search'
    }, searchParams, extraParams)).then(res => {
    if (res.body.error) {
      return Promise.reject(res.body)
    } else {
      return res.body.torrent_results
    }
  })
}
