const Dao = require('./org.dao');

// Dao.getCount({ organName: '湖北省公安局' }).then((res) => {
//   console.log(res);
// });

// Dao.getById(1).then((res) => {
//   console.log(res);
// });

Dao.getPageResult({}).then((res) => {
  console.log(res);
});
