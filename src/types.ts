export interface Bill {
  type: 0 | 1;
  time: number;
  category?: BillCategory["id"];
  amount: number;
}

export interface BillCategory {
  id: string;
  name: string;
  type: 0 | 1;
}

// 只是为了这些 key 能有提示，或许需要去掉这个类型。
export interface BillRequestParams extends Record<string, string> {
  year: string;
  month: string;
  category: string;
}


export interface OptionDataItem {
  description: string | number;
  value: string | number;
}
