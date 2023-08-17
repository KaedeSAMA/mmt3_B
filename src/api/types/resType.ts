interface IBaseResponce<D> {
  readonly code: string;
  data?: D;
  message: string;
}

type TUserLoginData = {
  userId: number;
  username: string;
  token: string;
  permissionId: number;
  permissionName: string;
};

type TUserLoginRes = IBaseResponce<TUserLoginData>;
type TUserRegisterRes = IBaseResponce<null>;

// ！下为个人信息页面用到的类型⬇️

// ？ 本部分接口命名规范：
// ？ 第一位（I/T）表示定义时使用Interface还是Type
// ？ 第二位（XxXxxxxXxxx）使用大驼峰表示类型命名
// ？ 第三位（Data/Res）表示该类型为数据类型还是响应类型

// ### 用户基本信息
type TUserBasicInfoData = {
  userId: number;
  username: string;
  phone: string;
  studentId: string;
  organizationId: number;
  organizationName: string;
  permissionId: number;
  permissionName: string;
  avatarUrl: string;
};
type TUserBasicInfoRes = IBaseResponce<TUserBasicInfoData>;

// ### 用户切换组织
type TSwitchOrganizationData = {
  permissionId: number;
  permissionName: string;
  token: string;
};
type TSwitchOrganizationRes = IBaseResponce<TSwitchOrganizationData>;

// ### 获取用户已加入组织的列表
type TGetOrganizationData = {
  num: string;
  organizations: Array<{
    organizationId: number;
    organizationName: string;
    active: boolean;
  }>;
};

type TGetOrganizationRes = IBaseResponce<TGetOrganizationData>;

// ### 修改密码
type TUpdatePasswordDataRes = IBaseResponce<{
  code: string;
  message: string;
}>;

// ！个人信息页面类型结束⬆️
export type {
  IBaseResponce,
  TGetOrganizationRes,
  TUserLoginRes,
  TUserRegisterRes,
  TUserBasicInfoRes,
  TSwitchOrganizationRes,
  TUpdatePasswordDataRes
};

//数据看板参数返回类型
interface ISiftBar<D> {
  organizationOrderBar: Array<D>;
  departmentOrderBar: Array<D>;
  nowDepartmentBar: Array<D>;
  nextTimeBar: Array<D>;
  nextPlaceBar: Array<D>;
}
type TSiftBarItem = {
  info: number;
  siftName: string;
  number: number;
};
type TSiftBar = ISiftBar<TSiftBarItem>;
type TGetDateBoardMessage = {
  siftBar: TSiftBar;
  interviewerInfoList: Array<{
    id: number;
    studentId: string;
    name: string;
    className: string;
    phone: string;
    organizationOrder: string;
    departmentOrder: string;
    nowDepartment: string;
    volunteerStatus: string;
    nextTime: string;
    nextPlace: string;
  }>;
  pageNow: number;
  pageNum: number;
};
type TGetDateBoardMessageRes = IBaseResponce<TGetDateBoardMessage>;
export type { TGetDateBoardMessageRes };
