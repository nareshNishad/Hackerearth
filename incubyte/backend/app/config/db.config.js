const DB_USER = 'username';
const PASSWORD = encodeURIComponent('Password@1234');
const MONGO_URI = `mongodb+srv://${DB_USER}:${PASSWORD}@cluster0.ibmn0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
module.exports = {
  url: MONGO_URI
};
