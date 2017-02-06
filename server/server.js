
const app = require('./app');

const PORT = process.env.PORT || 8080;

app().listen(3002, () => console.log(`Process ${process.pid} listening on port ${PORT}`));
