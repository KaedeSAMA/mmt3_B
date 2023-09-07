import { _axios } from '@/server/http';
import {
  TGetDepartmentRes,
  TGetPlacesRes,
  TGetPieRes,
  TGetInformMessageRes,
  TGetTableRes,
  TGetEmitResumeMessageRes
} from '@/api/types/resType';
import {Ttable} from '@/api/types/dataType';
import {TGetInformMessage,TGetResumeQuestion} from '@/api/types/paramsType';
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
const getTable=async(data:Ttable)=>{
  const res=await _axios.post<TGetTableRes,Ttable>(
    '/local/b/interview/review/info/sift',
      data
  )
  return res.data
}
//获取消息
const getMessage = async (status:number) => {
  const res = await _axios.get<TGetInformMessageRes,TGetInformMessage>(
    '/local/b/interview/review/message/template',
    {
      status:status
    }
  );
  console.log(res)
  return res.data;
};
//获取面试评价
const getEvaluate = async (id:number) => {
  const res = await _axios.get<TGetEmitResumeMessageRes,TGetResumeQuestion>(
    '/local/b/interview/realtime/comment',
    {
      interview:id
    }
  );
  if(!res.data){
    ElMessage({
      message: res.message,
      type: 'warning'
    });
  }else{
    console.log(res.data,'ppp')
    // return res.data;
    return {
      "count": 0,
      "interviewer": "string",
      "department": "string",
      "interviewTables": [
          {
              "round": 0,
              "editable": true,
              "realName": true,
              "isPass": 0,
              "expectDepartment": 0,
              "count": 0,
              "questions": [
                  {
                      "id": 0,
                      "order": 0,
                      "qType": 0,
                      "type": 0,
                      "question": "string",
                      "qMaxScore": 0,
                      "qOpts": {
                          "valueList": [
                              {
                                  "value": "string",
                                  "childValueList": {}
                              }
                          ]
                      },
                      "qHint": "string",
                      "aStr": "string",
                      "aInt": 0,
                      "aSelect": {
                          "answerList": [
                              "string"
                          ]
                      }
                  }
              ]
          }
      ]
  }
  }
};
export {
  getDepartment,
  getPlace ,
  getPie,
  getMessage,
  getTable
};
