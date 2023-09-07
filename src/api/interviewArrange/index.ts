import { _axios } from '@/server/http';
import {
  GetMainDataRes,
  GetMainDataFilterRes,
  GetAddressRes,
  MessageCheckRes,
  MessageSendRes
} from './types/res';
import { ElMessage } from 'element-plus';
import { QueryMainData, QueryCurrent } from './types/query';
import { MessageDataReq, FilterMainDataReq } from './types/req';

/**
 * @description 获取主数据
 * @param {number} params.page 页码
 * @param {number} params.pageNum 每页数量
 * @param {number} params.round 轮次
 */
export const getMainData = async (params: QueryMainData) => {
  const data = await _axios.get<GetMainDataRes, QueryMainData>(
    '/local/b/interview/arrangement/all',
    params
  );
  if (data.code !== '00000') {
    ElMessage.error(data.message);
  }
  return data.data;
};

/**
 * @description 获取主数据筛选条件
 * @param {number} params.round 轮次
 */
export const getMainDataFilter = async (round: QueryCurrent) => {
  const data = await _axios.get<GetMainDataFilterRes, QueryCurrent>(
    '/local/b/interview/arrangement/sift/bar',
    round
  );
  if (data.code !== '00000') {
    ElMessage.error(data.message);
  }
  return data.data;
};

/**
 * @description 筛选主数据
 * @param {number} params.page 页码
 * @param {number} params.pageNum 每页数量
 * @param {number} params.round 轮次
 * @param {number[]} query.departmentIdList 部门id列表
 * @param {number[]} query.admissionAddressList 地点id列表
 * @param {number[]} query.messageStatusList 消息状态列表
 * @param {string} query.search 搜索内容
 */
export const filterMainData = async (
  params: QueryMainData,
  query: FilterMainDataReq
) => {
  const data = await _axios.post<GetMainDataRes, FilterMainDataReq>(
    `/local/b/interview/arrangement/sift?${Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&')}`,
    query
  );
  if (data.code !== '00000') {
    ElMessage.error(data.message);
  }
  return data.data;
};

/**
 * @description 获取当前面试地点
 * @param {number} params.round 轮次
 */
export const getAddressRes = async (round: QueryCurrent) => {
  const data = await _axios.get<GetAddressRes, QueryCurrent>(
    '/local/b/interview/arrangement/address/all',
    round
  );
  if (data.code !== '00000') {
    ElMessage.error(data.message);
  }
  return data.data;
};

/**
 * @description 添加面试地点
 */
export const AddAddress = async (params: {
  departmentId: number;
  round: number;
  name: string;
}) => {
  // console.log(params);
  const data = await _axios.post<
    GetAddressRes,
    {
      departmentId: number;
      round: number;
      name: string;
    }
  >('/local/b/interview/arrangement/address/add', params);
  if (data.code !== '00000') {
    ElMessage.error(data.message);
  }
  return data;
};

/**
 * @description 删除面试地点
 * @param {number} params.id 地点id
 */
export const DeleteAddress = async (params: {
  round: number;
  addressId: number;
}) => {
  console.log(params);
  const data = await _axios.post<
    GetAddressRes,
    {
      round: number;
      addressId: number;
    }
  >('/local/b/interview/arrangement/address/deleted', params);
  if (data.code !== '00000') {
    ElMessage.error(data.message);
  }
  return data;
};

/**
 * @description 发送消息页面查看
 */
export const getSendMsg = async (params: QueryCurrent) => {
  const data = await _axios.get<MessageCheckRes, QueryCurrent>(
    '/local/b/interview/arrangement/message/check',
    params
  );
  if (data.code !== '00000') {
    ElMessage.error(data.message);
  }
  return data.data;
};

/**
 * @description 发送消息
 */
export const sendMsg = async (params: MessageDataReq) => {
  const data = await _axios.post<MessageSendRes, MessageDataReq>(
    '/local/b/interview/arrangement/message/send',
    params
  );
  if (data.code !== '00000') {
    ElMessage.error(data.message);
  }
  return data;
};
