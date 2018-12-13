const BaseBean = require('../../../common/beans/BaseBean');

class OptionBean extends BaseBean {
  constructor() {
    super();
    /** 主键 ID */
    this.id = { type: String, required: true };

    /** 问题 ID */
    this.questionId = { type: String };

    /** 类别 */
    this.category = { type: Number, required: true };

    /** 编码 */
    this.code = { type: String, required: true };

    /** 内容 */
    this.content = { type: String, required: true, default: '' };

    /** 被调查者填写的内容 */
    this.input = { type: String };

    /** 索引 */
    this.index = { type: Number, required: true };
  }
}

module.exports = OptionBean;
