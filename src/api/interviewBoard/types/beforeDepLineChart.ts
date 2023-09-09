export interface BeforeDepLineChart {
  code: string;
  data: Data;
  message: string;
}

export interface Data {
  /**
   * 日期（横坐标）
   */
  date: string[];
  /**
   * 每个志愿的数据
   */
  orders: Order[];
}

export interface Order {
  /**
   * 折线根据时间变化的数据
   */
  data?: number[];
  /**
   * 折线名
   */
  name?: string;
}

export interface BeforeDepLineChartArg {
  /**
   * 部门ID
   */
  departmentId?: number;
}
