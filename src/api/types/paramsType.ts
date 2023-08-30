type TGetOrganization = {
  studentId: string;
};
// 简历评价界面
type TGetResume = {
  id: number;
};
type TGetEvaluate = {
  id: number;
  round: number;
};
//获取轮次
type TGetRound={
  id:number
}
// 实时面试界面
//获取进度条
type TGetProgress={
  place:number
}
//获取面试者信息
type TGetMessage={
  place:number,
  page:number,
  keyword:string
}
export type {
  TGetOrganization,
  TGetResume,
  TGetEvaluate ,
  TGetRound,
  TGetMessage,
  TGetProgress
};
