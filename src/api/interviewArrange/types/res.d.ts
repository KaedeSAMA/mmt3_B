export interface BaseRes {
  code: string;
  message: string;
}
/**
 * @description 获取当前面试地点
 * @param {data.addressPoList} 地点列表
 */
export interface GetAddressRes extends BaseRes {
  data: GetAddressResData;
}
/**
 * @description 获取当前面试地点
 * @param addressPoList 地点列表
 */
export interface GetAddressResData {
  addressPoList: AddressPoList[];
}
/**
 * @description 地点列表
 * @param {string} addressName 地点名称
 * @param {number} id 地点id
 */
interface AddressPoList {
  addressName: string;
  id: number;
}

/**
 * @description 获取主数据筛选栏
 * @param {data.addressIdList} 地点列表
 * @param {data.departmentList} 部门列表
 * @param {data.messageStatusList} 消息状态列表
 */
export interface GetMainDataFilterRes extends BaseRes {
  data: GetMainDataFilterResData;
}
/**
 * @description 获取主数据筛选栏
 * @param {AddressIdList} addressIdList 地点列表
 * @param {DepartmentList} departmentList 部门列表
 * @param {MessageStatusList} messageStatusList 消息状态列表
 */
export interface GetMainDataFilterResData {
  addressIdList: AddressIdList[];
  departmentList: DepartmentList[];
  messageStatusList: MessageStatusList[];
}
/**
 * @description 地点列表
 * @param {number} id 地点id
 * @param {string} name 地点名称
 * @param {string} num 地点编号
 */
interface AddressIdList {
  id: number;
  name: string;
  num: string;
}
/**
 * @description 部门列表
 * @param {number} id 部门id
 * @param {string} name 部门名称
 * @param {string} num 部门编号
 */
interface DepartmentList {
  id: number;
  name: string;
  num: string;
}
/**
 * @description 消息状态列表
 * @param {number} id 消息状态id
 * @param {string} name 消息状态名称
 * @param {string} num 消息状态编号
 * 1已通知，2已安排未通知，3未安排
 */
interface MessageStatusList {
  id: number;
  name: string;
  num: string;
}

/**
 * @description 获取主数据
 * @param {data.allNum} 总数
 * @param {data.iaInfoPos} 面试信息列表
 * @param {data.page} 页码
 * @param {data.pageNum} 每页数量
 */
export interface GetMainDataRes extends BaseRes {
  data: GetMainDataResData;
}
/**
 * @description 获取主数据
 * @param {number} allNum 总数
 * @param {IaInfoPo[]} iaInfoPos 面试信息列表
 * @param {number} page 页码
 * @param {number} pageNum 每页数量
 */
export interface GetMainDataResData {
  allNum: number;
  iaInfoPos: IaInfoPo[];
  page: number;
  pageNum: number;
}
/**
 * @description 面试信息列表
 * @param {string} className 班级名称
 * @param {number} id 面试id
 * @param {string} interviewStatus 面试状态
 * @param {number} messageStatus 消息状态 > 1已通知，2已安排未通知，3未安排
 * @param {string} name 学生姓名
 * @param {string} nextPlace 下一面试地点
 * @param {string} nextTime 下一面试时间
 * @param {string} nowDepartment 当前部门
 * @param {string} studentId 学号
 * @param {number} userId 用户id
 */
interface IaInfoPo {
  className: string;
  id: number;
  interviewStatus: string;
  messageStatus: number;
  name: string;
  nextPlace: string;
  nextTime: string;
  nowDepartment: string;
  studentId: string;
  userId: number;
}

/**
 *  @description 发生消息页面查看
 */
export interface MessageCheckRes extends BaseRes {
  data: MessageCheckResData;
}
/**
 * @description 发生消息页面查看
 * @param {number} allNum 总数
 * @param {string} messageTemple 消息模板
 * @param {number} notifiedNum 已通知人数
 * @param {number} NotNotifiedNum 未通知人数
 */
export interface MessageCheckResData {
  allNum: number;
  messageTemple: string;
  notifiedNum: number;
  NotNotifiedNum: number;
}

/**
 * @description 发送消息
 */
export interface MessageSendRes extends BaseRes {
  data: { [key: string]: any } | null;
}
