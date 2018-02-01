const list = require('../lib/index').list
const should = require('chai').should
const constants = require('../src/constants')
should()


describe('list api test', function() {
  beforeEach(function() {
    this.timeout(60000)
  })

  this.timeout(60000)
  it('should list torrent', function() {
    return list().then(data => {
      data.length.should.above(0)
    })
  })

  it('should list torrent using movie category', function() {
    return list({ category: constants.CATEGORY.MOVIES_FULL_BD }).then(data => {
      data.length.should.above(0)
      data[0].category.toLowerCase().should.equal('movies/full bd')
    })
  })

  it('should list torrent and limit 100 torrent', function() {
    return list({ limit: 100 }).then(data => {
      data.length.should.equal(100)
    })
  })

  it('should list torrent sort by seeders', function() {
    return list({ sort: 'seeders' }).then(data => {
      data.length.should.above(0)
      data[0].seeders.should.above(data[1].seeders)
    })
  })

  it('should list torrent using simple json format', function() {
    return list({ format: 'json' }).then(data => {
      data.length.should.above(0)
      Object.keys(data[0]).length.should.equal(3)
    })
  })
})
