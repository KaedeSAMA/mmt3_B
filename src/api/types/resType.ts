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

//简历参数返回类型
type TQuestionListItem = {
  order: number;
  questionName: string;
  answer: string;
};
type TGetResumeMessage = {
  basicQuestion: {
    name: string;
    studentId: string;
    phone: string;
    gender: string;
    email: string;
    QQNumber: string;
    academy: string;
    major: string;
    className: string;
  };
  departmentQuestion: {
    departmentName: string;
    isTransfers: boolean;
    questionList: Array<TQuestionListItem>;
  };
  comprehensiveQuestion: {
    questionList: Array<TQuestionListItem>;
  };
  interviewFeedbackList: Array<{
    time: string;
    state: string;
  }>;
  signIn: {
    time: string;
    state: string;
  };
  InterviewArrangementList: Array<{
    round: 0;
    time: string;
    place: string;
  }>;
};
type TGetResumeMessageRes = IBaseResponce<TGetResumeMessage>;

// 面试评价接口返回数据
type TResultItem = {
  name: string;
  opinion: string;
};
type TGetEvaluateMessage = {
  status: number;
  round: string;
  interviewResult: Array<TResultItem>;
  PassDepartment: string;
  isTransfers: string;
  passResult: Array<TResultItem>;
  interviewGradingPo: {
    rank: number;
    interviewer: {
      project: string;
      name: Array<string>;
    };
    questionPoList: Array<{
      question: string;
      score: [number];
    }>;
  };
  comprehensiveQuestionList: Array<TResultItem>;
};
type TGetEvaluateMessageRes = IBaseResponce<TGetEvaluateMessage>;
export type {
  IBaseResponce,
  TGetOrganizationRes,
  TUserLoginRes,
  TUserRegisterRes,
  TUserBasicInfoRes,
  TSwitchOrganizationRes,
  TUpdatePasswordDataRes,
  TGetDateBoardMessageRes,
  TGetResumeMessageRes,
  TGetEvaluateMessageRes
};
