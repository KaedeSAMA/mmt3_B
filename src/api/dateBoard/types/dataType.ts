type Tpage = {
  page: number;
  pageNum: number;
};
type Tsort = {
  sortId: number;
  sortBy: number;
};
type Tfilter = {
  interviewRoundSift: Array<number>;
  interviewStatusSift: Array<number>;
  search: string;
  sort: Tsort;
  organizationOrderSift: Array<number>;
  departmentOrderSift: Array<number>;
  nowDepartmentSift: Array<number>;
  nextTimeSift: Array<string>;
  nextPlaceSift: Array<number>;
};
//面试评价界面
type Tchange = {
  id: number;
  round: number;
  state: number;
};

export type { Tsort, Tfilter, Tpage, Tchange};
