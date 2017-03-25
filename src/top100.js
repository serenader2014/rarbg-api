const cheerio = require('cheerio')

const TOP_100_URL = require('./constants').TOP_100_URL
const categories = require('./constants').categories
const utils = require('./utils')
const parseTable = utils.parseTable
const request = utils.request

module.exports = function listTop100(category) {
  if (typeof category === 'string') {
    category = [category]
  } else {
    category = category || []
  }
  let categoryIds = []

  category.forEach(c => {
    if (typeof c === 'string') {
      categoryIds = categoryIds.concat(categories[c])
    } else {
      categoryIds.push(c)
    }
  })

  const tmpMap = {}
  const queryString = categoryIds.filter(item => {
    if (!tmpMap[item]) {
      tmpMap[item] = true
      return true
    } else {
      return false
    }
  }).map(item => `category[]=${item}`).join('&')

  return request({
    url: queryString ? `${TOP_100_URL}?${queryString}` : TOP_100_URL,
  }).then(body => {
    const $ = cheerio.load(body)
    const table = $('table.lista2t')

    return parseTable($, table)
  })
}
