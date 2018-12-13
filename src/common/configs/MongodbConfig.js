const URI = 'mongodb://localhost/platform';

const OPTIONS = {
  useNewUrlParser: true,
  poolSize: 5, // Maintain up to 5 socket connections
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
};

module.exports = {
  URI,
  OPTIONS,
};
