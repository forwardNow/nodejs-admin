const BaseBean = require('../../../common/beans/BaseBean');

class PaperBean extends BaseBean {
  constructor() {
    super();
    /** 主键 ID */
    this.id = { type: String, required: true };

    /** 编码 */
    this.code = { type: String, required: true };

    /** 名称 */
    this.name = { type: String, required: true };

    /** 标题 */
    this.title = { type: String, required: true };

    /** 描述 */
    this.desc = { type: String, default: '' };
  }
}

module.exports = PaperBean;
