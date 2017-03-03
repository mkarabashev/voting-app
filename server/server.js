import mongoose from 'mongoose';
import app from './app';

import './models';

const PORT = parseInt(process.env.PORT, 10) || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/test';

const server = app();

mongoose.Promise = global.Promise;
const options = {
  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
};

const connect = () => mongoose.connect(MONGODB_URI, options);
connect();

const db = mongoose.connection;
db.on('error', console.error);
db.on('disconnected', connect);

db.once('open', function open() {
  console.log('db connection established');
  server.listen(PORT,
    () => console.log(`Process ${process.pid} listening on port ${PORT}`));
});
