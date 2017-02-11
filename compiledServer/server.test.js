'use strict';

var app = require('./app');

describe('Server', function () {
  var server = void 0;

  beforeEach(function () {
    return server = app().listen(PORT);
  });

  afterEach(function () {
    return server.close();
  });

  it('should send a 200 response on /', function (done) {
    chai.request(URL).get('/').end(function (err, res) {
      expect(err).to.be['null'];
      expect(res).to.have.status(200);
      expect(res).to.be.html;
      done();
    });
  });
});