export const BASE_URL = "http://localhost:3000";

export const EMPTY_STRING = "";

export const MONTHS = (() => {
  const months: string[] = [];
  for (let month = 1; month <= 12; month++) {
    months.push(month.toString());
  }
  return months;
})();

export const CNY_SYMBOL = "￥";
export const INCOME_TEXT = "收入";
export const EXPENDITURE_TEXT = "支出";
export const NOT_EMPTY_TEXT = "不能为空";
export const WRONG_FORMAT_TEXT = "格式不对";
export const TIME_TEXT = "时间";
export const CHOOSE_TIME_TEXT = "选择时间";
export const TYPE_TEXT = "类型";
export const AMOUNT_TEXT = "金额";
export const CATEGORY_TEXT = "分类";
export const CREATE_BILL_TEXT = "新建账单";
export const CONFIRM_TEXT = "confirm";
export const CANCEL_TEXT = "取消";

export enum ExtraCategoryValue {
  ALL = "All", // 所有类别
  NONE = "None", // 未分类
}

export enum ExtraCategoryName {
  ALL = "全部分类",
  NONE = "未分类",
}

export enum BillSearchParamsKey {
  YEAR = "year",
  MONTH = "month",
  CATEGORY = "category",
}
