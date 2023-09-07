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
 * @param {MessageData.message} 消息模板
 */
export interface MessageDataReq {
  messageSendPoList: MessageSendPo[];
  message: string;
}

interface MessageSendPo {
  interviewId: number;
  userId: number;
}
