import { _axios } from '@/server/http';
import axios from 'axios';
import { BASE_URL, TIME_OUT } from '@/server/request/config';
import showErrorInfo from '@/server/request/error';
import {
  TGetDateBoardMessageRes,
  TGetResumeMessageRes
} from '@/api/types/resType';
import { Tfilter, Tpage } from '@/api/types/dataType';
import { TGetResume } from '@/api/types/paramsType';
// 全部数据，既有query又有body原生axios
const getFilterData = async (page: Tpage, filterCondition: Tfilter) => {
  const res = await axios({
    url: BASE_URL + '/local/b/data/dashboard/sift',
    timeout: TIME_OUT,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    },
    params: page,
    data: filterCondition
  });
  if (res.status != 200) {
    showErrorInfo({ response: res });
  }
  return res.data.data;
};
//导出报名表的接口
const getExportData = async (filterCondition: Tfilter) => {
  const res = await _axios.post<TGetDateBoardMessageRes, Tfilter>(
    '/local/b/data/dashboard/export',
    filterCondition
  );
  return res.data;
};
const getResumeDate = async (id: string) => {
  const res = await _axios.get<TGetResumeMessageRes, TGetResume>(
    '/local//b/data/dashboard',
    { id }
  );
  console.log(res);
};
export { getFilterData, getExportData, getResumeDate };
