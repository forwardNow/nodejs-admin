const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/vue', { useNewUrlParser: true });

const sysMenuSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: '',
  },
  url: {
    type: String,
    default: '',
  },
  parentId: {
    type: String,
    default: '',
  },
  sysUserIds: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model('SysMenu', sysMenuSchema);
