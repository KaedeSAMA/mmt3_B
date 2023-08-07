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

// ！下为 账号管理 页面用到的类型⬇️

export type {
  TUserLogin,
  TRegister,
  TJoinOrganization,
  TSwitchOrganization,
  TUpdatePassword
};
