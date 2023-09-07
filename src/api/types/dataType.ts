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

// ！下为个人信息页面用到的类型⬇️

// ？ 本部分接口命名规范：
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

//数据看板页面
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
//面试评价界面
type Tchange = {
  id: number;
  round: number;
  state: number;
};
//面试复盘界面
// 表格接口数据
type Ttable = {
  page: number;
  departmentId: number | null;
  addressId: number | null;
  isSort: boolean | null;
  stateList: Array<number>;
  messagestateList: Array<number>;
  search: string;
};
export type {
  TUserLogin,
  TRegister,
  TJoinOrganization,
  TSwitchOrganization,
  TUpdatePassword,
  Tsort,
  Tfilter,
  Tpage,
  Tchange,
  Ttable
};
