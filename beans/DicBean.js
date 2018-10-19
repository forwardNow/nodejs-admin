const uuidv1 = require('uuid/v1');

const BaseBean = require('./BaseBean');

class DicBean extends BaseBean {
  constructor() {
    super();
    /** 主键 ID */
    this.DicId = { type: String, default: uuidv1 };

    /** 字典名称 */
    this.DicName = { type: String, required: true, default: '' };

    /** 字典描述 */
    this.DicDesc = { type: String, default: '' };
  }
}

module.exports = DicBean;