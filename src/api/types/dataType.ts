import { type } from 'os';

type TUserLogin = {
  studentId: string;
  password: string;
  organizationId: number;
};

type TRegister = {
  username: string;
  studentId: string;
  phoneNum: string;
  password: string;
  key: string;
};

// ！下为 个人信息 页面用到的类型⬇️

// ？ 本部分接口命名规范：
// ？ 本部分接口用于POST请求中Data的数据类型定义
// ？ 第一位（I/T）表示定义时使用Interface还是Type
// ？ 第二位（XxXxxxxXxxx）使用大驼峰表示类型命名

// ### 加入社团的传参类型
type TJoinOrganization = {
  key: string;
  password: string;
};

// ### 切换社团的类型
type TSwitchOrganization = {
  organizationId: number;
  password: string;
};

// ### 更改密码类型
type TUpdatePassword = {
  oldPassword: string;
  newPassword: string;
};

// ！个人信息页面类型结束⬆️

// ！下为 账号管理 页面用到的POST类型⬇️
type TaddAssociationMember = {
  studentId: string;
  name: string;
  permission: string;
  phone: string;
  passwd: string;
};

// ！账号管理 页面类型结束⬆️

export type {
  TUserLogin,
  TRegister,
  TJoinOrganization,
  TSwitchOrganization,
  TUpdatePassword,
  TaddAssociationMember
};

type Tpage = {
  page: number;
  pageNum: number;
};
type Tsort = {
  sortId: number;
  sortBy: number;
};
type Tfilter = {
  interviewRoundSift: Array<number>;
  interviewStatusSift: Array<number>;
  search: string;
  sort: Tsort;
  organizationOrderSift: Array<number>;
  departmentOrderSift: Array<number>;
  nowDepartmentSift: Array<number>;
  nextTimeSift: Array<string>;
  nextPlaceSift: Array<number>;
};
export type { Tsort, Tfilter, Tpage };

export interface Request {
  /**
   * 综合问题列表
   */
  comprehensiveQuestionList?: 报名表问题列表数据模型[];
  /**
   * 纳新部门数量
   */
  departmentNum?: number;
  /**
   * 部门问题列表
   */
  departmentQuesstionList?: 部门问题[];
  /**
   * 基本问题列表
   */
  essentialQuestionList?: 报名表问题列表数据模型[];
  /**
   * 是否可以调剂，false不可调剂，true可以调剂
   */
  isTransfers?: boolean;
  /**
   * 最大可报名部门数量
   */
  maxDepartmentNum?: number;
  [property: string]: any;
}

/**
 * 报名表问题列表数据模型，报名表问题实体
 */
export interface 报名表问题列表数据模型 {
  /**
   * 问题答案或提示，用于设置面试问题时使用
   */
  answer?: null | string;
  /**
   * 问题名称
   */
  conyent: string;
  id: number | null;
  /**
   * 问题选项类型，1单选，2多选，3下拉框，4输入框，5级联选择器，6量表题
   */
  type: number;
  /**
   * 问题选项的类
   */
  value: string[];
  [property: string]: any;
}

/**
 * 部门问题列表
 *
 * 部门问题
 */
export interface 部门问题 {
  departmentId: number;
  questionList: 报名表问题列表数据模型[];
  [property: string]: any;
}
