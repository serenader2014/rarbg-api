const list = require('../index').list
const should = require('chai').should
should()


describe('list top 100 api test', function() {
  this.timeout(60000)
  it('should list torrent', function() {
    return list().then(data => {
      data.length.should.above(0)
    })
  })
})
