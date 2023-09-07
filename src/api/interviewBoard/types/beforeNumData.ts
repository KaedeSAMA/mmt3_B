export interface BeforeNumData {
  code: string;
  data: Data;
  message: string;
}

export interface Data {
  /**
   * 第一志愿人数
   */
  firstChoiceNum: number;
  /**
   * 报名总人数
   */
  totalNum: number;
}

export interface BeforeNumDataArg {
  /**
   * 部门ID，可不传
   */
  departmentId?: number;
}
