export interface BeforeDepPieChart {
  code: string;
  data: Data;
  message: string;
}

export interface Data {
  nums: Num[];
  /**
   * 志愿数量
   */
  orderNum: number;
  /**
   * 报名总人数
   */
  totalNum: number;
}

export interface Num {
  /**
   * 报名人数
   */
  num?: number;
  /**
   * 志愿号
   */
  orderNum?: number;
}

export interface BeforeDepPieChartArg {
  /**
   * 部门ID
   */
  departmentId?: number;
}
