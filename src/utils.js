const r = require('request')

const jar = r.jar()
r.defaults({ jar: jar })

const constants = require('./constants')
const categories = constants.categories
const BASE_URL = constants.BASE_URL
const UA = constants.UA
const categoryIdReg = constants.categoryIdReg
const ratingReg = constants.ratingReg
const idReg = constants.idReg
const thumbnailReg = constants.thumbnailReg

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


// borrowed from:  https://github.com/same31/rarbgto-api/blob/master/lib/search.js#L8
function bypassAntiBotChecks (url) {
  const cookies = jar.getCookies(url)
  let cookieExpla = getCookie('expla')

  cookieExpla = cookieExpla && parseInt(cookieExpla.value) || 0

  function getCookie (key) {
    return cookies.find(cookie => cookie.key === key)
  }

  function setCookie (key, value, seconds) {
    let date
    value = (typeof key !== 'undefined' ? key + '=' : '') + value
    if (seconds) {
      date = new Date()
      date.setTime(date.getTime() + seconds * 1000)
      value += '; expires=' + date.toGMTString()
    }
    jar.setCookie(r.cookie(value), url)
  }

  setCookie('vDVPaqSe', 'r9jSB2Wk', 5 * 24 * 60 * 60)

  if (cookieExpla < 4) {
    setCookie('expla', cookieExpla + 1, 45)
    if (!getCookie('expla3')) {
      setCookie(undefined, 'tcc')
      setCookie('expla3', 1, 3)
    }
  }
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
      bypassAntiBotChecks(opts.url)

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
        case 'Cat.': {
          const categoryId = $td.find('a').attr('href').match(categoryIdReg)[1]
          result[key] = getCategory(categoryId)
          break
        }
        case 'File': {
          const title = $td.find('a').eq(0)
          const meta = $td.find('span').last()
          const link = title.attr('href')
          const thumbnail = title.attr('onmouseover').match(thumbnailReg)[1]
          const id = link.match(idReg)[1]

          if (meta.length) {
            const text = meta.text()
            const tmpArr = text.split('IMDB: ')

            result.meta = {
              genres: tmpArr[0].split(', '),
              IMDB: tmpArr[1]
            }
          }
          result[key] = title.text()
          result.id = id
          result.link = `${BASE_URL}${link}`
          result.thumbnail = thumbnail
          result.torrent = `${BASE_URL}/download.php?id=${id}&f=${title.text()}.torrent`
          break
        }
        case 'Rating': {
          const img = $td.find('img')
          let rating;
          if (img.length) {
            rating = $td.find('img').attr('src').match(ratingReg)[1]
          } else {
            rating = '- -'
          }
          result[key] = rating
          break
        }
        default: {
          result[key] = $td.text()
        }
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
