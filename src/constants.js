const BASE_URL = 'https://torrentapi.org/pubapi_v2.php'
const APP_ID = 'rarbg-api-nodejs'
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
const CATEGORY = {
  '4K_MOVIES_X264_4k': [50], // left for compatibility reasons
  '4K_X265_4k': [51], // left for compatibility reasons
  '4k_X264_4k_HDR': [52], // left for compatibility reasons
  XXX: [4],
  MOVIES_XVID: [14],
  MOVIES_XVID_720P: [48],
  MOVIES_X264: [17],
  MOVIES_X264_1080P: [44],
  MOVIES_X264_720P: [45],
  MOVIES_X264_3D: [47],
  MOVIES_X264_4K: [50],
  MOVIES_X265_1080P: [54],
  MOVIES_X265_4K: [51],
  MOVIES_X265_4K_HDR: [52],
  MOVIES_FULL_BD: [42],
  MOVIES_BD_REMUX: [46],
  TV_EPISODES: [18],
  TV_UHD_EPISODES: [49],
  TV_HD_EPISODES: [41],
  MUSIC_MP3: [23],
  MUSIC_FLAC: [25],
  GAMES_PC_ISO: [27],
  GAMES_PC_RIP: [28],
  GAMES_PS3: [40],
  GAMES_XBOX_360: [32],
  SOFTWARE_PC_ISO: [33],
  EBOOKS: [35]
}

const majorCategory = ['4K', 'MOVIES', 'TV', 'GAMES', 'MUSIC']

majorCategory.forEach(c => {
  const reg = new RegExp(c, 'i')
  CATEGORY[c] = Object.keys(CATEGORY).filter(category => reg.test(category)).reduce((arr, category) => {
    return arr.concat(CATEGORY[category])
  }, [])
})

CATEGORY.NON_XXX = Object.keys(CATEGORY).filter(category => category != 'XXX').reduce((arr, category) => {
  return arr.concat(CATEGORY[category])
}, [])

module.exports = {
  BASE_URL,
  CATEGORY,
  APP_ID,
  UA
}
