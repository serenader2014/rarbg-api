const cheerio = require('cheerio')

const TOP_100_URL = require('./constants').TOP_100_URL
const utils = require('./utils')
const parseTable = utils.parseTable
const request = utils.request

module.exports = function listTop100() {
  return request({
    url: `${TOP_100_URL}`,
  }).then(body => {
    const $ = cheerio.load(body)
    const table = $('table.lista2t')

    return parseTable($, table)
  })
}
