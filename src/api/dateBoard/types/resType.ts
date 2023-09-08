interface IBaseResponce<D> {
  readonly code: string;
  data?: D;
  message: string;
}
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
export type {
  IBaseResponce,
  TGetDateBoardMessageRes,
  TGetResumeMessageRes,
  TGetEvaluateMessageRes,
  TGetRoundRes,
};
