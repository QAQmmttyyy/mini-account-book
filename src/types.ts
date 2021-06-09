export interface Account {
  type: 0 | 1;
  time: number;
  category: AccountCategory["id"];
  amount: number;
}

export interface AccountCategory {
  id: string;
  name: string;
  type: 0 | 1;
}
