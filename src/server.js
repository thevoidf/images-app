const app = require('./app');
const {
  PORT,
  DATABASE_URL
} = process.env;
const mongoose = require('mongoose');

;(async () => {
  await mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  await app.listen(PORT);
  console.log('running on ' + PORT);
})();
