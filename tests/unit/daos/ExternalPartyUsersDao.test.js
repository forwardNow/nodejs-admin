const uuidv1 = require('uuid/v1');
const { expect } = require('chai');
const ExternalPartyUsersDao = require('../../../system/daos/ExternalPartyUsersDao');
const UsersDao = require('../../../system/daos/UserDao');

const id1 = uuidv1();
const id2 = uuidv1();

describe('test /daos/ExternalPartyUsersDao.js', () => {
  it('insert the a user', () => UsersDao.insert({
    UserId: id1,
    UserTrueName: '张三',
    UserNickname: '哇哈哈',
  }).then((res) => {
    expect(res).to.equal('ok');
  }));

  it('insert the first externalPartyUsers', () => ExternalPartyUsersDao.insert({
    ExternalPartyId: id2,
    UserId: id1,
    ExternalIdentifier: 'admin',
    ExternalCredential: '7410',
  }).then((res) => {
    expect(res).to.equal('ok');
  }));

  it('clear Users document', () => UsersDao.deleteByCondition({
    UserId: id1,
  }).then());


  it('clear ExternalPartyUsers document', () => ExternalPartyUsersDao.deleteByCondition({
    ExternalPartyId: id2,
  }).then());
});
