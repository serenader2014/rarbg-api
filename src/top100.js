const cheerio = require('cheerio')

const TOP_100_URL = require('./constants').TOP_100_URL
const categories = require('./constants').categories
const utils = require('./utils')
const parseTable = utils.parseTable
const request = utils.request
const parsePagination = utils.parsePaginationToQueryString
const parseCategory = utils.parseCategory

module.exports = function listTop100(category) {

  const categoryArr = parseCategory(category)
  const queryString = categoryArr.join('&')

  return request({
    url: queryString ? `${TOP_100_URL}?${queryString}` : TOP_100_URL,
  }).then(body => {
    const $ = cheerio.load(body)
    const table = $('table.lista2t')

    return parseTable($, table)
  })
}
