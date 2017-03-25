# Rarbg.to API

This is an unofficial nodejs api wrapper for rarbg.to website.


# API

### .listTop100([category: String|Array]): Array

List the Top 100 torrent.

#### Parameters

- **category**
    + String | Array[String|Number]
    + Optional
    
    Which category to be filterd. The value can be a string, or an array contains strings or numbers. If using string as the value, the value must be one of these: **['tv', 'movies', 'xxx', 'games', 'music', 'software', 'nonxxx', 'ebooks']**

    eg: `api.listTop100()`, `api.listTop100(['tv'])` , `api.listTop100([14, 41])`, `api.listTop100(['movies', '18'])`

#### Returns

The api returns a list of torrent. The details of the list structure can be found at [list data format](#list-structure)



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
    "File": "The.Flash.2014.S03E17.HDTV.x264-LOL[ettv]",
    "id": "dyizcv9",
    "link": "https://rarbg.to/torrent/dyizcv9",
    "thumbnail": "//dyncdn.me/static/20/tvdb/191692_small.jpg",
    "torrent": "https://rarbg.to/download.php?id=dyizcv9&f=The.Flash.2014.S03E17.HDTV.x264-LOL[ettv].torrent",
    "Added": "2017-03-22 02:01:09",
    "Size": "271.29 MB",
    "seeders": "3417",
    "leechers": "355",
    "comments": "4",
    "Rating": "5",
    "Uploader": "ettv"
  },
  {
    "category": "tv",
    "meta": {
      "genres": [
        "Action",
        "Adventure",
        "Crime",
        "Drama",
        "Mystery",
        "Sci-Fi "
      ],
      "IMDB": "7.9/10"
    },
    "File": "Arrow.S05E17.HDTV.x264-LOL[ettv]",
    "id": "z2ovehu",
    "link": "https://rarbg.to/torrent/z2ovehu",
    "thumbnail": "//dyncdn.me/static/20/tvdb/22160_small.jpg",
    "torrent": "https://rarbg.to/download.php?id=z2ovehu&f=Arrow.S05E17.HDTV.x264-LOL[ettv].torrent",
    "Added": "2017-03-23 02:03:34",
    "Size": "254.42 MB",
    "seeders": "3025",
    "leechers": "403",
    "comments": "--",
    "Rating": "5",
    "Uploader": "ettv"
  }
]
```
