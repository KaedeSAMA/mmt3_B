import { _axios } from '@/server/http';
import axios from 'axios';
import { BASE_URL, TIME_OUT } from '@/server/request/config';
import showErrorInfo from '@/server/request/error';
import {
  TGetDateBoardMessageRes,
  TGetResumeMessageRes,
  TGetEvaluateMessageRes,
  TGetRoundRes
} from '@/api/dateBoard/types/resType';
import { Tfilter, Tpage, Tchange } from '@/api/dateBoard/types/dataType';
import {
  TGetResume,
  TGetEvaluate,
  TGetRound
} from '@/api/dateBoard/types/paramsType';
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
//简历接口
const getResumeData = async (id: number) => {
  const res = await _axios.get<TGetResumeMessageRes, TGetResume>(
    '/local/b/data/dashboard/resume/info',
    { id: id }
  );
  return res.data;
};
// 面试评价接口
const getEvaluate = async (id: number, round: number) => {
  const res = await _axios.get<TGetEvaluateMessageRes, TGetEvaluate>(
    '/local/b/data/dashboard/interview/evaluation/info',
    { id: id, round: round }
  );
  return res.data;
};
// 获取面试轮次
const getRound = async (id: number) => {
  const res = await _axios.get<TGetRoundRes, TGetRound>(
    '/local/b/data/dashboard/interview/evaluation/round',
    { id: id }
  );
  return res.data;
};
//改变面试状态
const changeStatus = async (id: number, round: number, state: number) => {
  const res = await _axios.post<any, Tchange>(
    '/local/b/data/dashboard/interview/evaluation/change',
    {
      id,
      round,
      state
    }
  );
  if (res.message === '更改成功') {
    ElMessage({
      message: res.message,
      type: 'success'
    });
  } else {
    ElMessage({
      message: res.message,
      type: 'warning'
    });
  }
};
export {
  getFilterData,
  getExportData,
  getResumeData,
  getEvaluate,
  getRound,
  changeStatus
};
