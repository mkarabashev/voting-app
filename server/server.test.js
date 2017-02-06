'use strict';

const app = require('./app');

describe('Server', () => {
  let server;

  beforeEach(() => server = app().listen(PORT));

  afterEach(() => server.close());

  it('should send a 200 response on /', done => {
    chai.request(URL)
      .get('/')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
      });
  });
});
