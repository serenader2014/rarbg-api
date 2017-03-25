const r = require('request')
const cheerio = require('cheerio')

const BASE_URL = 'https://rarbg.to'

const TOP_100_URL = '/top100.php'

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36'

var categories = {
  tv:       [18, 41],
  movies:   [14, 17, 42, 44, 45, 46, 47, 48],
  xxx:      [4],
  games:    [27, 28, 29, 30, 31, 32, 40],
  music:    [23, 24, 25, 26],
  software: [33, 34, 43],
  nonxxx:   [14, 15, 16, 17, 21, 22, 42, 18, 19, 41, 27, 28, 29, 30, 31, 32, 40, 23, 24, 25, 26, 33, 34, 43, 44, 45, 46, 47, 48],
  ebooks:   [35]
}

function request(options) {
  return new Promise((resolve, reject) => {
    r(options, (err, res, body) => {
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

const categoryIdReg = /\?category=(\d+)$/
const ratingReg = /.+(\d+).png$/

function listTop100() {
  return request({
    url: `${BASE_URL}${TOP_100_URL}`,
    method: 'GET',
    headers: {
      'User-Agent': UA
    }
  }).then(body => {
    const $ = cheerio.load(body)
    const table = $('table.lista2t')
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
  })
}

listTop100().then(data => {
  console.log(data[0])
})

module.exports = {
  listTop100
}
