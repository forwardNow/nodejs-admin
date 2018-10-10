const { expect } = require('chai');
const MongodbUtil = require('../../../utils/MongodbUtil');

describe('test /utils/MongodbUtil.js', () => {
  it('connect to Mongodb', () => {
    const client = MongodbUtil.getClient();
    expect(client).to.be.an('object');
  });

  it('close a connection', () => {
    const client = MongodbUtil.getClient();
    client.close();
  });
});
