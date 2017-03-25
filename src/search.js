const cheerio = require('cheerio')

const SEARCH_URL = require('./constants').SEARCH_URL
const utils = require('./utils')
const parseTable = utils.parseTable
const request = utils.request
const parsePagination = utils.parsePaginationToQueryString
const parseCategory = utils.parseCategory

module.exports = function searchTorrent(keyword, category, pagination) {
  const categoryArr = parseCategory(category)
  const pnArr = parsePagination(pagination)
  const search = [`search=${keyword}`]
  const queryString = categoryArr.concat(pnArr, search).join('&')

  console.log(queryString)

  return request({
    url: `${SEARCH_URL}?${queryString}`,
  }).then(body => {
    const $ = cheerio.load(body)
    // if (~$('body').text().indexOf('Please wait while we try to verify your browser...')) {
    //   return new Promise(resolve => {
    //     setTimeout(() => {
    //       resolve(searchTorrent(keyword, category, pagination))
    //     }, 3000)
    //   })
    // }
    const table = $('table.lista2t')

    return parseTable($, table)
  })
}
