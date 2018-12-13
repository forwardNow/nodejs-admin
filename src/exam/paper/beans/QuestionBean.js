const BaseBean = require('../../../common/beans/BaseBean');

class QuestionBean extends BaseBean {
  constructor() {
    super();
    /** 主键 ID */
    this.id = { type: String, required: true };

    /** 试卷 id */
    this.paperId = { type: String };

    /** 父 ID */
    this.parentId = { type: String };

    /** 类别 */
    this.category = { type: Number, required: true };

    /** 编码 */
    this.code = { type: String, required: true };

    /** 内容 */
    this.content = { type: String, required: true, default: '' };

    /** 标准答案 */
    this.answer = { type: Array, default: [] };

    /** 被调查者填写的内容 */
    this.input = { type: String };

    /** 顺序 */
    this.sort = { type: Number, required: true, default: 1 };
  }
}

module.exports = QuestionBean;
