/**
 * @description 一键选择\自动选择
 * @param {number[]} addressIdList 地点id列表
 * @param {number} endTime 结束时间
 * @param {number[]} interviewIdList 面试id列表
 * @param {number} startTime 开始时间
 * @param {number} time 时间
 */
export interface ManualReq {
  addressIdList: number[];
  endTime: number;
  interviewIdList: number[];
  startTime: number;
  time: number;
}

/**
 * @description 发送消息
 * @param {MessageData.messageSendPoList} 消息发送列表
 */
export interface MessageDataReq {
  messageSendPoList: MessageSendPo[];
}

/**
 * @description 消息发送列表
 * @param {string} message 消息内容
 * @param {number} interviewId 面试id
 * @param {number} userId 用户id
 */
interface MessageSendPo {
  message: string;
  interviewId: number;
  userId: number;
}

/**
 * @description 筛选主数据
 * @param {number[]} departmentIdList 部门id列表
 * @param {number[]} admissionAddressList 地点id列表
 * @param {number[]} messageStatusList 消息状态列表
 * @param {string} search 搜索内容
 */
export interface FilterMainDataReq {
  departmentIdList: number[];
  admissionAddressList: number[];
  messageStatusList: number[];
  search: string | null;
}
