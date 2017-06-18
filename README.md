# Rarbg.to API

This is an unofficial nodejs api wrapper for rarbg.to website.

[![Build Status](https://travis-ci.org/serenader2014/rarbg-api.svg?branch=master)](https://travis-ci.org/serenader2014/rarbg-api)
[![npm module](https://badge.fury.io/js/rarbg-api.svg)](https://www.npmjs.org/package/rarbg-api)
[![dependencies](https://david-dm.org/serenader2014/rarbg-api.svg](https://david-dm.org/serenader2014/rarbg-api.svg)

# Installation

First download this package from npm registry

```bash
npm i --save rarbg-api
```

and require it from your project:

```javascript
const rarbgApi = require('rarbg-api')
```

# API

### .list([options: Object]): Array

List torrent.

#### Parameters

- **options**
    + Object
    + Optional
    
    See [additional options section](#additional-options)


#### Returns

The api returns a promise which will resolve a list of torrent.

### .search(keyword[, options, type]): Array

Search torrent using a keyword.

#### Parameters

- **keyword**
    + String

    Specify a keyword to search.

- **options**
    + Object
    + Optional

    See [additional options section](#additional-options)

- **type**
    + String
    + Optional
    
    Specify a search mode to use. Available type is: `['imdb', 'tvdb', 'themoviedb', 'tvrage']`. If search type is provided, the search keyword is a specific id, for example, if you provide `imdb` search type, the keyword must be a `imdb` id. Eg: `search('tt0944947', null, 'imdb')`. 

#### Returns

The api returns a promise which will resolve the search result.

# Additional options

Some of the apis support category filtering and sorting, and other options. All available options are: 

```javascript
  const defaultParams = {
    category: null,
    limit: 25,
    sort: 'last',
    min_seeders: null,
    min_leechers: null,
    format: 'json_extended',
    ranked: null,
  }
```

### category

You can specify a category to filter the torrent. Category infomations can be imported by `require('./index').CATEGORY`. This options support an array.

Eg: 

```javascript
const rarbgApi = require('./index')

rarbgApi.list({
  category: rarbgApi.CATEGORY.MOVIES
}).then(data => console.log(data))
```

The above example will list latest movie torrents.

### limit

Limit the result torrent's size. Default size is 25, all supported options are: **25, 50, 100**

Eg:

```javascript
const rarbgApi = require('./index')

rarbgApi.list({
  limit: 50
}).then(data => console.log(data.length))
```

### sort

Specify the sorting. Default sorting is `last`. Available options are: **last, seeders, leechers**

Eg: 

```javascript
const rarbgApi = require('./index')

rarbgApi.list({
  sort: 'seeders'
}).then(data => console.log(data))
```

### min_seeders, min_leechers

Filtering the torrent by specify the torrent's minimal seeders or minimal leechers. It's value is a number. Default is `null`.

Eg:

```javascript
const rarbgApi = require('./index')
rarbgApi.list({
  min_seeders: 100
}).then(data => console.log(data))
```

### format

Specify which format will the api returns. Default is `json_extended`, which will include the detail infomations of each torrent. Other supported option is **json**.

The `json_extended` format is:

```json
{ 
    "title": "Logan.2017.1080p.WEB-DL.DD5.1.H264-FGT",
    "category": "Movies/x264/1080",
    "download": "magnet:?xt=urn:btih:d2d6a72b60cdb2cc5e80d3277d89d5df18c3ecbc&dn=Logan.2017.1080p.WEB-DL.DD5.1.H264-FGT&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2710&tr=udp%3A%2F%2F9.rarbg.to%3A2710&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce",
    "seeders": 848,
    "leechers": 116,
    "size": 5100226269,
    "pubdate": "2017-05-15 09:37:27 +0000",
    "episode_info": { 
        "imdb": "tt3315342",
        "tvrage": null,
        "tvdb": null,
        "themoviedb": "263115" 
    }
}
```


The `json` format is:

```json
{
    "filename": "Real.Time.With.Bill.Maher.2017.06.09.1080p.WEB.h264-TBS[rartv]",
    "category": "TV HD Episodes",
    "download": "magnet:?xt=urn:btih:f6afb0028270ccca6d4535be4c42a0583a5a5737&dn=Real.Time.With.Bill.Maher.2017.06.09.1080p.WEB.h264-TBS%5Brartv%5D&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2710&tr=udp%3A%2F%2F9.rarbg.to%3A2710&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce"
}
```


### ranked

By default the api will return only ranked torrents ( internal ) , scene releases + -rarbg releases + -rartv releases.

If you want other groups included in the results use the ranked parameter with a value of 0 to get them included.

# Test

Clone this project, and install the dependencies `npm i`, and run `npm run test` to see the test result.

Note that sometimes the test will fail because of the network problem. Currently all the tests timeout is 60000ms, if your network is poor, you may encounter test timeout error.

# Limitation

Due to the rarbg api's limitation, you may encounter error like:

```json
{
  "error": "Too many requests per second. Maximum requests allowed are 1req/2sec Please try again later!",
  "error_code": 5
}
```

The api is limit to 1req/2sec, so you should control the frequency.
