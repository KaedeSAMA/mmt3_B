import { _axios } from '@/server/http';
import {
  TGetDepartmentRes,
  TGetPlacesRes,
  TGetPieRes,
  TGetInformMessageRes,
  TGetTableRes,
  TGetInformProgressRes,
  TGetEmitResumeMessageRes
} from '@/api/interviewReply/types/resType';
import { Ttable ,Tsend,Tresume} from '@/api/interviewReply/types/dataType';
import { TGetInformProgress, TGetResumeQuestion } from '@/api/interviewReply/types/paramsType';
//获取面试部门
const getDepartment = async () => {
  const res = await _axios.get<TGetDepartmentRes, null>(
    '/local/b/interview/departments'
  );
  if (res.data) {
    return res.data;
  } else {
    ElMessage({
      message: res.message,
      type: 'warning'
    });
  }
};
// 获取地点
const getPlace = async () => {
  const res = await _axios.get<TGetPlacesRes, null>(
    '/local/b/interview/review/address/all'
  );
  if (res.data) {
    return res.data;
  } else {
    ElMessage({
      message: res.message,
      type: 'warning'
    });
  }
};
//获取饼图
const getPie = async () => {
  const res = await _axios.get<TGetPieRes, null>(
    '/local/b/interview/review/pie/chat/info'
  );
  return res.data;
};
//获取表格
const getTable = async (data: Ttable) => {
  const res = await _axios.post<TGetTableRes, Ttable>(
    '/local/b/interview/review/info/sift',
    data
  );
  return res.data;
};
//获取消息
const getMessage = async () => {
  const res = await _axios.get<TGetInformMessageRes, null>(
    '/local/b/interview/review/message/template'
  );
  return res.data;
};
//获取进度
const getProgress=async(status:number)=>{
  const res = await _axios.get<TGetInformProgressRes, TGetInformProgress>(
    '/local/b/interview/review/message/num',
    {
      status
    }
  );
  return res;
}
//一键安排
const arrangeStu = async (interviewIdList: Array<number>) => {
  const res = await _axios.post<any, { interviewIdList: number[]; }>(
    '/local/b/interview/review/arrange',
    {
    interviewIdList
    }
  );
  if (res.code !== '00000') {
    ElMessage.error(res.message);
    return;
  }else{
    ElMessage.success(res.message);
  }
};
//发送结果
const sendData = async (data: Tsend) => {
  const res = await _axios.post<any, Tsend>(
    '/local/b/interview/review/message/send',
    data
  );
  if (res.code !== '00000') {
    ElMessage.error(res.message);
    return;
  }else{
    ElMessage.success(res.message);
  }
  return res.code
};

//获取面试评价
const getEvaluate = async (id: number) => {
  const res = await _axios.get<TGetEmitResumeMessageRes, TGetResumeQuestion>(
    '/local/b/interview/realtime/comment',
    {
      interview: id
    }
  );
  if (!res.data) {
    ElMessage({
      message: res.message,
      type: 'warning'
    });
  } else {
    return res.data;
  }
};
//提交面试评价
const sendResume = async (data: Tresume) => {
  const res = await _axios.put<any, Tresume>(
    '/local/b/interview/realtime/comment',
    data
  );
  if (res.code !== '00000') {
    ElMessage.error(res.message);
    return;
  }else{
    ElMessage.success(res.message);
  }
};
export {
  getDepartment,
  getPlace,
  getPie,
  getMessage,
  getTable,
  getEvaluate,
  getProgress,
  arrangeStu,
  sendData,
  sendResume
};
