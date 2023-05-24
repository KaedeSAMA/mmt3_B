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

export type { TUserLogin, TRegister };
