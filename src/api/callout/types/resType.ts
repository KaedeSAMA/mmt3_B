interface IBaseResponse<D> {
  readonly code: string;
  data?: D;
  message: string;
}
interface Data {
  /**
   * 社团组织头像url
   */
  avatarUrl: string;
  /**
   * 社团组织简介
   */
  briefIntroduction: string;
  /**
   * 社团组织联系方式
   */
  contactInfo: null | string;
  /**
   * 社团组织日常
   */
  daily: null | string;
  /**
   * 社团纳新部门列表
   */
  departmentList: DepartmentList[];
  /**
   * 社团组织特色
   */
  feature: null | string;
  /**
   * 社团组织介绍
   */
  introduction: string;
  /**
   * 社团组织更多
   */
  more: null | string;
  /**
   * 社团组织名称
   */
  name: string;
  /**
   * 社团组织宣言
   */
  slogan: null | string;
  /**
   * 社团标签列表
   */
  tagList: TagList[];
}
interface DepartmentList {
  /**
   * 社团纳新部门简介
   */
  briefIntroduction: string;
  /**
   * 社团纳新部门id，用于更新社团纳新宣传信息时传参，表示已有该社团
   */
  id: number;
  /**
   * 社团纳新部门介绍
   */
  introduction: string;
  /**
   * 社团纳新部门名称
   */
  name: string;
  /**
   * 社团纳新部门标准
   */
  standard: null | string;
}

interface TagList {
  /**
   * 社团标签名称
   */
  tag: string;
  /**
   * 社团标签类型，1 系统标签 2 自定义标签
   */
  type: number;
}
export type TUpdateDeptInfoRes = IBaseResponse<null>;
export type TGetDeptInfoRes = IBaseResponse<Data>;
