const BaseBean = require('../../common/beans/BaseBean');

class QuestionnaireOptionBean extends BaseBean {
  constructor() {
    super();
    /** 主键 ID */
    this.OptionId = { type: String, required: true };

    /**
     * 类型
     *
     * 10 选择：
     * 11   单选 - [1]
     * 12   多选 - [1, 2, 3]
     * 20 填空：
     * 21   单空 - ['填空内容 1']
     * 22   多空 - ['填空内容 1', '填空内容 2']
     * 30 回答：
     * 31   ['回答内容']
     */
    this.OptionType = { type: Number, required: true };

    /** 内容 */
    this.OptionContent = { type: String, required: true, default: '' };

    /** 顺序 */
    this.OptionSort = { type: Number, required: true };

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

module.exports = QuestionnaireOptionBean;
