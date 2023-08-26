import { _axios } from '@/server/http';
import { GetMainDataRes } from './types/res';
import { ElMessage } from 'element-plus';
import { QueryMainData } from './types/query';

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
