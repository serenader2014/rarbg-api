const search = require('../index').search
const should = require('chai').should
should()

describe('search api test', function() {
  this.timeout(60000)
  it('search a torrent using a keyword', () => {
    return search('arrival').then(data => {
      console.log(data)
      data.length.should.above(0)
    })
  })
})
