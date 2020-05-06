const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  mongoURI:
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-vhmkf.mongodb.net/test?retryWrites=true&w=majority`,
};
