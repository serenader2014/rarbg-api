const utils = require('./utils')
const constants = require('./constants')
const request = utils.request
const proceedExtraParams = utils.proceedExtraParams

module.exports = function search(keyword, options, type) {
  const search = {}
  if (type && ~['imdb', 'tvdb', 'themoviedb', 'tvrage'].indexOf(type)) {
    search[`search_${type}`] = keyword
  } else {
    search.search_string = keyword
  }
  const extraParams = proceedExtraParams(options)
  return request(constants.BASE_URL, Object.assign({}, {
      mode: 'search'
    }, search, extraParams)).then(res => {
    if (res.body.error) {
      return Promise.reject(res.body)
    } else {
      return res.body.torrent_results
    }
  })
}
