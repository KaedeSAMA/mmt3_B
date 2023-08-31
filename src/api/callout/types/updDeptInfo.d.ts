export interface UpdateDeptInfo {
  /**
   * 社团简介
   */
  briefIntroduction: string;
  /**
   * 社团联系方式
   */
  contactInfo?: string;
  /**
   * 社团日常
   */
  daily?: string;
  /**
   * 社团纳新部门列表
   */
  departmentList: DepartmentList[];
  /**
   * 社团特色
   */
  feature?: string;
  /**
   * 社团介绍
   */
  introduction?: string;
  /**
   * 更多
   */
  more?: string;
  /**
   * 社团宣言
   */
  slogan?: string;
  /**
   * 标签列表
   */
  tagList: TagList[];
}

interface DepartmentList {
  /**
   * 纳新部门简介
   */
  briefIntroduction: string;
  /**
   * 纳新部门id，部门id在获取社团宣传信息时获得，如果是新添加的社团，id为null即可
   */
  id?: number | null;
  /**
   * 纳新部门介绍
   */
  introduction: string;
  /**
   * 纳新部门名称
   */
  name: string;
  /**
   * 纳新部门标准
   */
  standard?: string;
}

interface TagList {
  /**
   * 标签名
   */
  tag: string;
  /**
   * 标签类型， 1系统标签，2自定义标签
   */
  type: number;
}
