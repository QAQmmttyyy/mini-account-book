import { Bill, BillCategory } from "../types";
import { csvToArray } from "../utils";
import { plainText as billCsvString } from "./data/bill.csv";
import { plainText as categoriesCsvString } from "./data/categories.csv";

const billsData = csvToArray<Bill>(billCsvString);
const categoriesData = csvToArray<BillCategory>(categoriesCsvString);

export const TableName = {
  BILL: "bills",
  CATEGORY: "categories",
};

abstract class Table<T = any> {
  abstract add(item: T): void;
  abstract query(fn: (item: T) => boolean): T[];
}

class DevEnvTable<T = any> extends Table<T> {
  private storage;
  private name;
  constructor(name: string, initial: T[]) {
    super();
    this.storage = localStorage;
    this.name = name;
    this.storage.setItem(name, JSON.stringify(initial));
  }
  private get collection() {
    const storageItem = this.storage.getItem(this.name);
    const collection = storageItem ? JSON.parse(storageItem) : [];
    return collection as T[];
  }
  add(data: T) {
    this.storage.setItem(
      this.name,
      JSON.stringify(this.collection.concat(data))
    );
  }
  query(fn: (data: T) => boolean) {
    return this.collection.filter(fn);
  }
}

class TestEnvTable<T = any> extends Table<T> {
  private storage;
  private name;
  constructor(name: string, initial: T[]) {
    super();
    this.storage = new Map<string, T[]>();
    this.name = name;
    this.storage.set(name, initial);
  }
  private get collection() {
    return this.storage.get(this.name) ?? [];
  }
  add(data: T) {
    this.storage.set(this.name, this.collection.concat(data));
  }
  query(fn: (data: T) => boolean) {
    return this.collection.filter(fn);
  }
}

abstract class MockDB {
  abstract setTable<T = any>(name: string, initial: T[]): void;
  abstract getTable<T = any>(name: string): Table<T> | undefined;
}

class DevEnvDB extends MockDB {
  private storage;
  private tables;
  constructor() {
    super();
    this.storage = localStorage;
    this.tables = new Map<string, Table>();
    for (const name of Object.values(TableName)) {
      const tableStorageItem = this.storage.getItem(name);
      if (tableStorageItem) {
        this.setTable(name, JSON.parse(tableStorageItem));
      }
    }
  }
  setTable<T = any>(name: string, initial: T[]) {
    this.tables.set(name, new DevEnvTable<T>(name, initial));
  }
  getTable<T = any>(name: string): Table<T> | undefined {
    return this.tables.get(name);
  }
}

class TestEnvDB extends MockDB {
  private tables;
  constructor() {
    super();
    this.tables = new Map<string, Table>();
  }
  setTable<T = any>(name: string, initial: T[]) {
    this.tables.set(name, new TestEnvTable<T>(name, initial));
  }
  getTable<T = any>(name: string): Table<T> | undefined {
    return this.tables.get(name);
  }
}

export function createDB(env?: string): MockDB {
  switch (env) {
    case "development":
      return new DevEnvDB();
    case "test":
      return new TestEnvDB();
    default:
      return new DevEnvDB();
  }
}

export function setupDB() {
  if (!db.getTable(TableName.BILL)) {
    db.setTable<Bill>(TableName.BILL, billsData);
  }
  if (!db.getTable(TableName.CATEGORY)) {
    db.setTable<BillCategory>(TableName.CATEGORY, categoriesData);
  }
}

const db = createDB(process.env.NODE_ENV);
setupDB();
export default db;
