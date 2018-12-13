const BaseBean = require('../../common/beans/BaseBean');

class QuestionnaireQuestionBean extends BaseBean {
  constructor() {
    super();
    /** 主键 ID */
    this.QuestionId = { type: String, required: true };

    /** 内容 */
    this.QuestionContent = { type: String, required: true, default: '' };

    /**
     * 答案。
     *
     * 选择：
     *    单选 - [1]
     *    多选 - [1, 2, 3]
     * 填空：
     *    单空 - ['填空内容 1']
     *    多空 - ['填空内容 1', '填空内容 2']
     * 回答：
     *    ['回答内容']
     */
    this.QuestionAnswer = { type: Array, required: true, default: [] };
  }
}

module.exports = QuestionnaireQuestionBean;
