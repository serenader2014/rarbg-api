const should = require('chai').should
const search = require('../lib/index').search

should()

describe('search api test', function() {
  beforeEach(function(done) {
    this.timeout(60000)
    // ensure every test wait 2sec before sending the real request,
    // because of the api's frequency limitation.
    setTimeout(function() {
      done()
    }, 2000)
  })
  this.timeout(60000)

  it('search torrent using keyword', function() {
    return search('prison break').then(data => {
      data.length.should.above(0)
      data[0].title.toLowerCase().should.include('prison')
    })
  })

  it('search torrent from imdb using a imdb id', function() {
    // tt0944947 is Game.Of.Thrones
    return search('tt0944947', null, 'imdb').then(data => {
      data.length.should.above(0)
      data[0].title.toLowerCase().should.include('game')
    })
  })
})
