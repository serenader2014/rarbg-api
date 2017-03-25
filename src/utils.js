const r = require('request')
const constants = require('./constants')
const categories = constants.categories
const BASE_URL = constants.BASE_URL
const UA = constants.UA
const categoryIdReg = constants.categoryIdReg
const ratingReg = constants.ratingReg

const toString = Object.prototype.toString

function isObject(target) {
  return toString.call(target) === '[object Object]'
}

function isArray(target) {
  return toString.call(target) === '[object Array]'
}

function deepClone() {
  const target = arguments[0]
  const lists = [].slice.call(arguments, 1)
  lists.forEach(item => {
    if (!isObject(item)) return

    for (const i of Object.keys(item)) {
      const value = item[i]
      if (isObject(value)) {
        target[i] = deepClone({}, target[i], value)
      } else {
        target[i] = value
      }
    }
  })

  return target
}

const defaultRequestOptions = {
  method: 'GET',
  headers: {
    'User-Agent': UA
  }
}

function request(options) {
  const opts = deepClone({}, defaultRequestOptions, options)
  opts.url = `${BASE_URL}${options.url}`

  return new Promise((resolve, reject) => {
    r(opts, (err, res, body) => {
      if (err) {
        reject(err)
      } else {
        resolve(body)
      }
    })
  })
}

function getCategory(id) {
  let result = ''
  for (let category of Object.keys(categories)) {
    const ids = categories[category]
    if (~ids.indexOf(Number(id))) {
      result = category
      break
    }
  }

  return result
}

function parseTable($, table) {
  const tr = table.find('tr')
  const headers = tr.eq(0).find('td').map((i, header) => $(header).text())
  const list = tr.slice(1)
  const data = list.map((i, item) => {
    const result = {}
    $(item).find('td').map((idx, td) => {
      const key = headers[idx] || 'comments'
      const $td = $(td)

      switch (key) {
        case 'Cat.':
          const categoryId = $td.find('a').attr('href').match(categoryIdReg)[1]
          result[key] = getCategory(categoryId)
          break
        case 'File':
          const title = $td.find('a').eq(0).text()
          const meta = $td.find('span').last()
          if (meta.length) {
            const text = meta.text()
            const tmpArr = text.split('IMDB: ')

            result.meta = {
              genres: tmpArr[0].split(', '),
              IMDB: tmpArr[1]
            }
          }
          result[key] = title
          break
        case 'Rating':
          const img = $td.find('img')
          let rating;
          if (img.length) {
            rating = $td.find('img').attr('src').match(ratingReg)[1]
          } else {
            rating = '- -'
          }
          result[key] = rating
          break
        default:
          result[key] = $td.text()
      }
    })

    return result
  })

  return data.toArray()
}

module.exports = {
  parseTable,
  getCategory,
  request,
}
