/**
 * @description: IndexedDB封装
 * @param {string} databaseName 数据库名称
 * @param {string} storeName 表名称
 * @param {string} keyPath 主键
 * @example:
 * interface UserData {
 *  id: number;
 * name: string;
 * age: number;
 * }
 * const dbWrapper = new IndexedDBWrapper<UserData>('myDatabase', 'myStore', 'id');
 * dbWrapper.add({ id: 1, name: 'John', age: 30 });
 * dbWrapper.get(1);
 * dbWrapper.update({ id: 1, name: 'Jane', age: 28 });
 * dbWrapper.delete(1);
 * //添加数据
    dbWrapper
    .add({ id: 1, name: 'John', age: 30 })
    .then(() => {
        console.log('Data added successfully');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
 */
export default class IndexedDBWrapper<T> {
  private db: IDBDatabase | null = null;

  constructor(
    private databaseName: string,
    private storeName: string,
    private keyPath: keyof T & string
  ) {
    this.openDatabase();
  }

  /**
   * @description: 打开数据库
   * @returns
   */
  private openDatabase() {
    const request = indexedDB.open(this.databaseName, 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
      db.createObjectStore(this.storeName, { keyPath: this.keyPath });
    };

    request.onsuccess = (event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
    };
  }

  /**
   * @description: 添加数据
   * @param data 数据
   * @returns
   */
  async add(data: T): Promise<void> {
    if (!this.db) return;

    const transaction = this.db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);

    return new Promise((resolve, reject) => {
      const request = store.add(data);
      request.onsuccess = () => resolve();
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }

  /**
   * @description: 获取数据
   * @param id 索引字段
   * @returns
   */
  async get(id: any): Promise<T | undefined> {
    if (!this.db) return;

    const transaction = this.db.transaction([this.storeName], 'readonly');
    const store = transaction.objectStore(this.storeName);

    return new Promise((resolve, reject) => {
      const getRequest = store.get(id);
      getRequest.onsuccess = (event) =>
        resolve((event.target as IDBRequest).result);
      getRequest.onerror = (event) =>
        reject((event.target as IDBRequest).error);
    });
  }

  /**
   * @description 完整更新一条数据
   * @param data 更新数据
   * @returns
   */
  async update(data: T): Promise<void> {
    if (!this.db) return;

    const transaction = this.db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);

    return new Promise((resolve, reject) => {
      const request = store.put(data);
      request.onsuccess = () => resolve();
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }

  /**
   * @description: 修改某一字段
   * @param id 索引字段
   * @param fieldName 修改字段
   * @param value 修改值
   * @returns
   */
  async updateField(
    id: any,
    fieldName: keyof T,
    value: T[keyof T]
  ): Promise<void> {
    if (!this.db) return;

    const transaction = this.db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);

    const getRequest = store.get(id);

    getRequest.onsuccess = (event) => {
      const data = (event.target as IDBRequest).result as T;
      if (!data) return;

      data[fieldName] = value as NonNullable<T>[keyof T];

      const updateRequest = store.put(data, id);

      updateRequest.onsuccess = () => {
        console.log(
          `Field "${String(
            fieldName
          )}" of data with id ${id} updated successfully`
        );
      };

      updateRequest.onerror = (event) => {
        console.error(
          `Error updating field "${String(fieldName)}" of data with id ${id}:`,
          (event.target as IDBRequest).error
        );
      };
    };

    getRequest.onerror = (event) => {
      console.error(
        `Error getting data with id ${id}:`,
        (event.target as IDBRequest).error
      );
    };
  }

  /**
   * @description: 删除某一条数据
   * @param id 索引字段
   * @returns
   */
  async delete(id: any): Promise<void> {
    if (!this.db) return;

    const transaction = this.db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);

    return new Promise((resolve, reject) => {
      const deleteRequest = store.delete(id);
      deleteRequest.onsuccess = () => resolve();
      deleteRequest.onerror = (event) =>
        reject((event.target as IDBRequest).error);
    });
  }
}
