import { _axios } from '@/server/http';
import {
  GetMainDataRes,
  GetMainDataFilterRes,
  GetAddressRes
} from './types/res';
import { ElMessage } from 'element-plus';
import { QueryMainData, QueryCurrent } from './types/query';

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
