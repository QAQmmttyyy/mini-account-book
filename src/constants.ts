export const BASE_URL = "http://localhost:3000";

export const EMPTY_STRING = "";

export const MONTHS = (() => {
  const months: string[] = [];
  for (let month = 1; month <= 12; month++) {
    months.push(month.toString());
  }
  return months;
})();

export enum ExtraCategoryValue {
  ALL = "All", // 所有类别
  NONE = "None", // 未分类
}

export enum ExtraCategoryName {
  ALL = "全部分类",
  NONE = "未分类",
}
