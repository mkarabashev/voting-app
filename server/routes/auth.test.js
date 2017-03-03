import User from '../models/userSchema/userSchema';
import express from 'express';
import nock from 'nock';
import { serialize, deserialize } from './auth';

describe('(routes) auth', () => {
  let app,
    fakeFbApi,
    fbCallback,
    fbClientId,
    fbPath,
    fbUrl,
    server;
    
  beforeEach(() => {
    app = express();
    require('./auth').default(app);
    app.get('/', (req, res) => res.send('root'))
    server = app.listen(PORT);
  });

  afterEach(() => server.close());

  it('should redirect to fb auth when user goes to /login/facebook', done => {
    // intercepts the call to fb
    fbUrl = 'www.facebook.com';
    fbCallback = 'http%3A%2F%2Flocalhost%3A3001%2Flogin%2Ffacebook%2Freturn';
    fbClientId = '0123456789';
    fbPath = `/dialog/oauth?response_type=code&redirect_uri=${fbCallback}&client_id=${fbClientId}`;
    fakeFbApi = nock(`https://${fbUrl}`);
    fakeFbApi
      .get(fbPath)
      .reply(200, {
        id: '1234567890',
        displayName: 'test_subject'
      });

    // checks if the server sends a legit fb auth request
    chai.request(URL)
      .get('/login/facebook')
      .end((err, res) => {
        // checks if server redirects to fb
        expect(err).to.be.null;
        expect(res).to.redirect;

        // checks if fb redirect is provided with client id and a callback
        const redirectReq = res.res.req;
        expect(redirectReq.headers.host.indexOf(fbUrl)).not.to.equal(-1);
        expect(redirectReq.path.indexOf(fbCallback)).not.to.equal(-1);
        expect(redirectReq.path.indexOf(fbClientId)).not.to.equal(-1);
        done();
      });
  });
});

describe('(auth) serialize', () => {
  let cb = (err, data) => err || data;

  it('should provide a call back with user id on serialize', () => {
    const data = { _id: 1 };
    const expected = 1;
    expect(serialize(data, cb)).to.equal(expected);
  });
});

describe('(auth) deserialize', () => {
  let MockUser;

  let id = 1;
  let cb = (err, data) => err || data;



  beforeEach(() => {
    MockUser = sinon.mock(User);
  });

  afterEach(() => {
    MockUser.verify();
    MockUser.restore();
  });

  it('should provide a callback with user on deserialize', () => {
    const expected = 'user';

    MockUser
      .expects('findById').withArgs(id)
      .resolves(expected);

    expect(deserialize(id, cb)).to.eventually.equal(expected);
  });

  it('should produce an error when no user is found on deserialize', () => {
    const expected = new Error('error');

    MockUser
      .expects('findById').withArgs(id)
      .rejects('error');

    expect(deserialize(id, cb)).to.eventually.deep.equal(expected);
  });
});
