const { expect } = require('chai');
const MongodbUtil = require('../../../utils/MongodbUtil');
const UsersDao = require('../../../daos/UsersDao');

describe('test /daos/UsersDao.js', () => {
  // before('clear Users document', () => UsersDao.deleteByCondition().then());

  after('disconnect Mongodb', () => {
    MongodbUtil.close();
  });

  it('insert the first user', () => UsersDao.insert({
    UserId: '1',
    UserTrueName: '张三',
    UserNickname: '哇哈哈',
  }).then((res) => {
    expect(res).to.equal('ok');
  }));

  it('insert the second user', () => UsersDao.insert({
    UserId: '2',
    UserTrueName: '李四',
    UserNickname: '黑盒',
  }).then((res) => {
    expect(res).to.equal('ok');
  }));

  it('count Users', () => UsersDao.getCountByCondition().then((count) => {
    expect(count).to.equal(2);
  }));

  it('get list users', () => UsersDao.getListByConditionAndPager().then((list) => {
    expect(list).to.be.an('array').that.have.lengthOf(2);
    expect(list[0].UserId).to.equal('1');
    expect(list[1].UserId).to.equal('2');
  }));

  it('update user', () => UsersDao.updateSelectiveByCondition(
    { UserId: '1' },
    { UserTrueName: '张三三' },
  ).then((res) => {
    expect(res).to.not.equal(null);
  }));


  it('get a user by UserId', () => UsersDao.getByCondition({
    UserId: '1',
  }).then((res) => {
    expect(res).to.include({
      UserId: '1',
      UserTrueName: '张三三',
      UserNickname: '哇哈哈',
    });
  }));

  it('clear Users document', () => UsersDao.deleteByCondition().then());
});
