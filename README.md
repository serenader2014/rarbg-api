# Rarbg.to API

This is an unofficial nodejs api wrapper for rarbg.to website.


# API

### .listTop100([category: String|Array, pagination: Object]): Array

List the Top 100 torrent.

#### Parameters

- **category**
    + String | Array[String|Number]
    + Optional
    
    Which category to be filterd. The value can be a string, or an array contains strings or numbers. If using string as the value, the value must be one of these: `['tv', 'movies', 'xxx', 'games', 'music', 'software', 'nonxxx', 'ebooks']`

    eg: `api.listTop100()`, `api.listTop100(['tv'])` , `api.listTop100([14, 41])`, `api.listTop100(['movies', '18'])`

- **pagination**
    + Object
    + Optional

    Pagination options. More details about pagination please refer to [pagination section](#pagination)

    eg: `api.listTop100(null, { order: 'size' })`

#### Returns

The api returns a list of torrent. The details of the list structure can be found at [list data format](#list-structure)

# Pagination

```json
{
    "by": "DESC",
    "order": "data",
    "page": 1
}
```

- `by`: Value can be: `['DESC', 'ASC']`
- `order`: Value can be: `['filename', 'data', 'size', 'seeders', 'leechers']`
- `page`: page number

# Resource structure

## List structure

```json
[
  {
    "category": "tv",
    "meta": {
      "genres": [
        "Action",
        "Adventure",
        "Drama",
        "Sci-Fi "
      ],
      "IMDB": "8.1/10"
    },
    "file": "The.Flash.2014.S03E17.HDTV.x264-LOL[ettv]",
    "id": "dyizcv9",
    "link": "https://rarbg.to/torrent/dyizcv9",
    "thumbnail": "//dyncdn.me/static/20/tvdb/191692_small.jpg",
    "torrent": "https://rarbg.to/download.php?id=dyizcv9&f=The.Flash.2014.S03E17.HDTV.x264-LOL[ettv].torrent",
    "added": "2017-03-22 02:01:09",
    "size": "271.29 MB",
    "seeders": "3413",
    "leechers": "370",
    "comments": "4",
    "rating": "5",
    "uploader": "ettv"
  },
  {
    "category": "movies",
    "meta": {
      "genres": [
        "Horror",
        "Thriller "
      ],
      "IMDB": "7.5/10"
    },
    "file": "Split.2016.1080p.KORSUB.HDRip.x264.AAC2.0-STUTTERSHIT",
    "id": "ef7t5lq",
    "link": "https://rarbg.to/torrent/ef7t5lq",
    "thumbnail": "//dyncdn.me/mimages/318327/over_opt.jpg",
    "torrent": "https://rarbg.to/download.php?id=ef7t5lq&f=Split.2016.1080p.KORSUB.HDRip.x264.AAC2.0-STUTTERSHIT.torrent",
    "added": "2017-03-23 04:46:47",
    "size": "4.20 GB",
    "seeders": "2962",
    "leechers": "1175",
    "comments": "215",
    "rating": "3",
    "uploader": "Scene"
  }
]
```
