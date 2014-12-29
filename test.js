var request = require('supertest');
var app = require('./app');

describe('Requests to the roshambo path', function() {
  it('Returns a 200 status code', function(done) {
    request(app)
      .get('/roshambo')
      .expect(200)
      .end(function(error) {
        if(error) throw error;
        done();
      });
  });
  it('Returns a 400 status code for bad weapon', function(done) {
    request(app)
      .get('/roshambo/penny')
      .expect(400)
      .end(function(error) {
        if(error) throw error;
        done();
      });
  });
  it('Returns a 200 status code for good weapon', function(done) {
    request(app)
      .get('/roshambo/rock')
      .expect(200, done);
  });
});
