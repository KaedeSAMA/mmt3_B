// db.ts
import Dexie, { Table } from 'dexie';
import { Data } from '@/api/callout/types/resType';

class MyIndexDBClass extends Dexie {
  promotionInfo!: Table<Data,number>;

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      promotionInfo: '&id' // Primary key and indexed props
    });
    // 实例化表
    this.promotionInfo = this.table('promotionInfo');
  }
}

export default new MyIndexDBClass();
