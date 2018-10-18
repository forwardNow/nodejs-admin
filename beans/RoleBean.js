const uuidv1 = require('uuid/v1');
const BaseBean = require('./BaseBean');

class RoleBean extends BaseBean {
  constructor() {
    super();

    /** 角色ID */
    this.RoleId = { type: String, required: true, default: uuidv1 };

    /** 角色名称 */
    this.RoleName = { type: String, default: '' };

    /** 角色类别 */
    this.RoleCategory = { type: Number, default: '' };

    /** 角色状态：（1-启用；0-未启用） */
    this.RoleState = { type: Number, default: 1 };

    /** 排序 */
    this.Sort = { type: Number, default: 1 };

    /** 角色描述 */
    this.RoleDes = { type: String, default: '' };
  }
}

module.exports = RoleBean;
