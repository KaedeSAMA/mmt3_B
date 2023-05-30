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

// ### 用户加入组织
// ！个人信息页面类型结束⬆️
export type {
  IBaseResponce,
  TGetOrganizationRes,
  TUserLoginRes,
  TUserRegisterRes,
  TUserBasicInfoRes,
  TSwitchOrganizationRes
};
