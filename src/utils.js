const https = require('https')
const querystring = require('querystring')
const baseUrl = require('./constants').BASE_URL

const token = (() => {
  let currentToken = ''
  return {
    get() {
      return currentToken
    },
    set(newToken) {
      currentToken = newToken
      return currentToken
    }
  }
})()

function r(url, options) {
  return new Promise((resolve, reject) => {
    const qs = options ? `?${querystring.stringify(options)}` : ''
    const finalUrl = `${url}${qs}`
    const req = https.get(finalUrl, res => {
      let body = ''
      res.on('data', chunk => {
        body += chunk
      })
      res.on('end', () => {
        try {
          body = JSON.parse(body)
        } catch (e) {}
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: body
        })
      })
    })

    req.on('error', err => {
      reject(err)
    })
    req.end()
  })
}

function getToken() {
  return r(baseUrl, {
    get_token: 'get_token'
  }).then(res => res.body.token)
}

function request(url, options) {
  return new Promise(resolve => {
    resolve(token.get() || getToken())
  }).then(currentToken => {
    options = options || {}
    options.token = currentToken
    return r(url, options)
  }).then(res => {
    if (res.body && res.body.error && res.body.error_code == 4) {
      // token expired
      token.set(null)
      return request(url, options)
    } else {
      return res
    }
  })
}

module.exports = {
  request
}
