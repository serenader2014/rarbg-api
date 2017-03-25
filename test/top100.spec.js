const top100 = require('../index').listTop100
const should = require('chai').should
should()


describe('list top 100 api test', function() {
  this.timeout(60000)
  it('should have 100 records', function() {
    return top100().then(data => {
      console.log(data)
      data.length.should.equal(100)
    })
  })
})
