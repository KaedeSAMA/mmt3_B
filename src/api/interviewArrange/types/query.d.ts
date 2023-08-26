/**
 * @description 获取当前面试地点/获取主数据筛选栏
 * @param {number} round 轮次
 */
export interface QueryCurrent {
  round: number;
}

/**
 * @description 获取主数据
 * @param {number} page 页码
 * @param {number} pageNum 每页数量
 * @param {number} round 轮次
 */
export interface QueryMainData extends QueryCurrent {
  page: number;
  pageNum: number;
}
