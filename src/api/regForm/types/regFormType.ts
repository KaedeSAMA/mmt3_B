import { IBaseResponce } from '../../types/resType';

type Tdepartment = {
  departmentId?: number;
  departmentName?: string;
};

type DataDepartment = {
  departments: Tdepartment[];
  num: number;
};

type ResAllDepartment = IBaseResponce<DataDepartment>;

type PostRegFormData = {
  /**
   * 综合问题列表
   */
  comprehensiveQuestionList?: unitQuestion[];
  /**
   * 纳新部门数量
   */
  departmentNum?: number;
  /**
   * 部门问题列表
   */
  departmentQuesstionList?: departmentQuesstionList[];
  /**
   * 基本问题列表
   */
  essentialQuestionList?: unitQuestion[];
  /**
   * 是否可以调剂，false不可调剂，true可以调剂
   */
  isTransfers?: boolean;
  /**
   * 最大可报名部门数量
   */
  maxDepartmentNum?: number;
  // [property: string]: any;
};

/**
 * 报名表问题列表数据模型，报名表问题实体
 */
type unitQuestion = {
  answer?: null | string;
  content: string;
  id: number | null;
  type: number;
  value: string[];
  [property: string]: any;
};

/**
 * 部门问题列表
 *
 * 部门问题
 */
type departmentQuesstionList = {
  departmentId: number;
  questionList: unitQuestion[];
  [property: string]: any;
};

export type { ResAllDepartment, Tdepartment, PostRegFormData };
