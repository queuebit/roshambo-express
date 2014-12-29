var request = require('supertest');
var app = require('./app');

describe('Requests to the roshambo path', function() {
  it('Returns a 200 status code', function(done) {
    request(app)
      .get('/roshambo/')
      .expect(200)
      .end(function(error) {
        if(error) throw error;
        done();
      });
  });
  it('Returns HTML format', function(done) {
    request(app)
      .get('/roshambo/')
      .expect('Content-Type', /html/, done);
  });
  it('Returns an index file with Rock', function(done) {
    request(app)
      .get('/roshambo/')
      .expect(/rock/i, done);
  });
});

describe('Requests to the roshambo game with weapon', function() {
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
  it('Returns JSON format', function(done) {
    request(app)
      .get('/roshambo/rock')
      .expect('Content-Type', /json/, done);
  });
  it('Returns human weapon used', function(done) {
    request(app)
      .get('/roshambo/paper')
      .expect(200)
      .expect(function(response) {
        if (!(response.body.human === 'paper')) return 'wrong weapon';
      })
      .end(function(error, response) {
        if(error) throw error;
        done();
      });
  });
});
