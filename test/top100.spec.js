const top100 = require('../index').listTop100
const should = require('chai').should
should()


describe('list top 100 api test', function() {
  this.timeout(60000)
  it('should have 100 records', function() {
    return top100().then(data => {
      data.length.should.equal(100)
    })
  })

  it('should list 100 tv records', function() {
    return top100('tv').then(data => {
      data.length.should.equal(100)
      data[0]['Cat.'].should.equal('tv')
    })
  })

  it('should list 100 tv and movies', function() {
    return top100(['tv', 'movies']).then(data => {
      data.length.should.equal(100)
    })
  })

  it('should list 100 xxx and tv', function() {
    return top100([4, 18]).then(data => {
      data.length.should.equal(100)
    })
  })
})
