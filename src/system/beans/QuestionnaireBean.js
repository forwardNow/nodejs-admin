const BaseBean = require('../../common/beans/BaseBean');

class QuestionnaireBean extends BaseBean {
  constructor() {
    super();
    /** 主键 ID */
    this.QuestionnaireId = { type: String, required: true };

    /** 问卷名称 */
    this.QuestionnaireName = { type: String, required: true, default: '' };

    /** 问卷编码 */
    this.QuestionnaireCode = { type: String, required: true, default: '' };

    /** 问卷描述 */
    this.QuestionnaireDesc = { type: String, default: '' };
  }
}

module.exports = QuestionnaireBean;
