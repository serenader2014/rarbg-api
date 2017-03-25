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

const categoryIdReg = /\?category=(\d+)$/
const ratingReg = /.+(\d+).png$/
const idReg = /torrent\/([0-9a-zA-Z]+)$/
const thumbnailReg = /<img src=\\'(.+)\\'/

module.exports = {
  BASE_URL,
  TOP_100_URL,
  UA,
  categories,
  categoryIdReg,
  ratingReg,
  idReg,
  thumbnailReg,
}
