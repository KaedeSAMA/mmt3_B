import { _axios } from '@/server/http';
import {TGetPlaceRes,TGetprogressRes,TGetMessageRes,TGetCodeRes} from '@/api/types/resType';
import {} from '@/api/types/dataType';
import {TGetProgress,TGetMessage } from '@/api/types/paramsType';

const getPlace=async()=>{
  const res = await _axios.get<TGetPlaceRes,null>(
    '/local/b/interview/realtime/places'
  );
  if (res.data) {
    return res.data
  } else {
    ElMessage({
      message: res.message,
      type: 'warning'
    });
  }
}
const getProgress=async(id:number)=>{
  const res = await _axios.get<TGetprogressRes,TGetProgress>(
    '/local/b/interview/realtime/progressBar',
    {
      place:id
    }
  );
  if(res.data){
    return res.data
  }
}
const getMessage=async(place:number,page:number,keyword:string)=>{
  const res = await _axios.get<TGetMessageRes,TGetMessage>(
    '/local/b/interview/realtime/interviewee',
    {
      place,
      page,
      keyword
    }
  );
  if(res.data){
    return res.data
  }
}
const getqrcode=async()=>{
  const res = await _axios.get<TGetCodeRes,null>(
    '/local/b/interview/realtime/qrcode'
  );
  if (res.data) {
    return res.data
  } else {
    ElMessage({
      message: res.message,
      type: 'warning'
    });
  }
}
export{
  getPlace,
  getProgress,
  getMessage,
  getqrcode
}
