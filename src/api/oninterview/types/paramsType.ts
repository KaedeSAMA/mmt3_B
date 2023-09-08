// 实时面试界面
//获取进度条
type TGetProgress = {
  place: number;
};
//获取面试者信息
type TGetMessage = {
  place: number;
  page: number;
  keyword: string;
};
export type {
  TGetMessage,
  TGetProgress,
};
