interface IBaseResponce<D> {
  readonly code: string;
  data?: D;
  message: string;
}
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
export type {
  IBaseResponce,
  TGetPlaceRes,
  TGetprogressRes,
  TGetMessageRes,
  TGetCodeRes,
};
