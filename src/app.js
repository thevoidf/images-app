require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const path = require('path');
const { UPLOAD_DIR } = process.env;
const app = express();

const schema = require('./schema');
const providers = require('./providers');
const images = require('./routes/images');

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: providers,
  graphiql: true
}));

const dir = path.join(__dirname, '..', UPLOAD_DIR);
app.use('/static', express.static(dir))

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok'
  });
});

app.use('/images', images);

app.use((error, req, res, next) => {
  const {
    message = 'Something went wrong'
  } = error;
  res.status(500).json({ error: message });
});

module.exports = app;
