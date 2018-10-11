const uuidv1 = require('uuid/v1');
const { expect } = require('chai');
const UsersDao = require('../../../daos/UsersDao');

const id1 = uuidv1();
const id2 = uuidv1();

describe('test /daos/UsersDao.js', () => {
  it('insert the first user', () => UsersDao.insert({
    UserId: id1,
    UserTrueName: '张三',
    UserNickname: '哇哈哈',
  }).then((res) => {
    expect(res).to.equal('ok');
  }));

  it('insert the second user', () => UsersDao.insert({
    UserId: id2,
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
    expect(list[0].UserTrueName).to.equal('张三');
    expect(list[1].UserTrueName).to.equal('李四');
  }));

  it('update user', () => UsersDao.updateSelectiveByCondition(
    { UserTrueName: '张三' },
    { UserTrueName: '张三三' },
  ).then((res) => {
    expect(res).to.not.equal(null);
  }));


  it('get a user by UserTrueName', () => UsersDao.getByCondition({
    UserTrueName: '张三三',
  }).then((res) => {
    expect(res).to.include({
      UserTrueName: '张三三',
      UserNickname: '哇哈哈',
    });
  }));

  it('clear Users document', () => UsersDao.deleteByCondition({
    UserId: {
      $in: [id1, id2],
    },
  }).then());
});
