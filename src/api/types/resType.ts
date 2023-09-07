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
  interviewArrangementList: Array<{
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
  passDepartment: string;
  isTransfers: boolean;
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

type TGetRound = {
  round: number;
};
type TGetRoundRes = IBaseResponce<TGetRound>;

//实时面试界面
//获取面试地点
type TGetPlace = {
  count: number;
  places: Array<{
    id: number;
    name: string;
  }>;
};
type TGetPlaceRes = IBaseResponce<TGetPlace>;
//获取进度条
type TGetprogress = {
  groupNum: number;
  bars: Array<{
    time: number;
    total: number;
    finished: number;
  }>;
};
type TGetprogressRes = IBaseResponce<TGetprogress>;
//获取面试者信息
type TGetMessage = {
  pages: number;
  count: number;
  interviewees: Array<{
    id: number;
    cId: number;
    studentId: string;
    name: string;
    className: string;
    department: string;
    time: string;
    place: string;
    issigned: boolean;
    status: number;
  }>;
};
type TGetMessageRes = IBaseResponce<TGetMessage>;
//获取二维码
type TGetCodeRes = IBaseResponce<string>;

//面试复盘界面
// 获取组织部门
type TGetDepartment={
  num:number,
  departments:Array<{
    departmentId:number
    departmentName:string
  }>
}
type TGetDepartmentRes = IBaseResponce<TGetDepartment>;
//获取地点
type TGetPlaces={
  addressPoList:Array<{
    id:number
    name:string
    departmentId:number
    round:number
  }>
  round:number
}
type TGetPlacesRes = IBaseResponce<TGetPlaces>;
//获取饼图
type pie={
  id:number
  content:string
  num:number
}
type TGetPie={
  pieChatAll:{
    resultOverview:{
      notOperated:pie
      undetermined:pie
      pass:pie
      fail:pie
      num:number
    },
    departmentDivide:{
      divide:Array<pie>
      num:number
    }
    addressDivide:{
      divide:Array<pie>
      num:number
    }
  }
}
type TGetPieRes = IBaseResponce<TGetPie>;
//获取消息通知模板
type TGetInformMessage={
  messageTemplate: string,
  notifiedNum: number,
  allNum: number,
  NotNotifiedNum: number
}
type TGetInformMessageRes = IBaseResponce<TGetInformMessage>;
//获取表格数据
type TGetTable={
  title: Array<
    {
        label: number,
        question: string
    }
  >,
  tableData: Array<
    {
        id: number,
        userId: number,
        studentId: string,
        name: string,
        className: string,
        score: Array<
            {
                label: number,
                score: number
            }
        >,
        stateId: number,
        state: string,
        messageStateId: number,
        messageState: string
    }
  >,
  page: number,
  pageAll: number,
  allNum: number
}
type TGetTableRes = IBaseResponce<TGetTable>;

//获取评价
type TGetEmitResumeMessage={
  count: number,
  interviewer: string,
  department: string,
  interviewTables: Array<
      {
          round: number,
          editable: boolean,
          realName: boolean,
          isPass: number,
          expectDepartment: number,
          count: number,
          questions: Array<
              {
                  id: number,
                  order: number,
                  qType: number,
                  type: number,
                  question: string,
                  qMaxScore: number,
                  qOpts: {
                      valueList: Array<any>
                  },
                  qHint: string,
                  aStr: string,
                  aInt: number,
                  aSelect: {
                      answerList: Array<
                          string
                      >
                  }
              }
          >
      }
  >
}
type TGetEmitResumeMessageRes = IBaseResponce<TGetEmitResumeMessage>;

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
  TGetEvaluateMessageRes,
  TGetRoundRes,
  TGetPlaceRes,
  TGetprogressRes,
  TGetMessageRes,
  TGetCodeRes,
  TGetDepartmentRes,
  TGetPlacesRes,
  TGetPieRes,
  TGetInformMessageRes,
  TGetTableRes,
  TGetEmitResumeMessageRes
};
