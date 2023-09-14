export interface BeforeOrgPieChart {
  code: string;
  data: Data;
  message: string;
}

export interface Data {
  /**
   * 组织报名人数
   */
  cNum: number;
  /**
   * 有数据的组织数
   */
  depNum: number;
  depNums: DepNum[];
}

export interface DepNum {
  /**
   * 部门名称
   */
  departmentName?: string;
  /**
   * 部门第一志愿人数
   */
  firstChoiceNum: number;
  /**
   * 部门报名人数
   */
  num?: number;
}
