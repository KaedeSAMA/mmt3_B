export interface BeforeOrgLineChart {
  code: string;
  data: Data;
  message: string;
}

export interface Data {
  /**
   * 日期，用作横坐标
   */
  date: string[];
  /**
   * 各部门数据
   */
  departments: Department[];
}

export interface Department {
  /**
   * 报名人数数据
   */
  data?: number[];
  /**
   * 部门名称，用作折线名
   */
  name?: string;
}
