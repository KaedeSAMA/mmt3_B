import { _axios } from '@/server/http';
import type { TUserRegisterRes } from '../types/resType';
import type { TRegister } from '../types/dataType';
const userRegister = async (userRegisterData: TRegister) => {
  const data = await _axios.post<TUserRegisterRes, TRegister>(
    '/local/b/user/reg',
    userRegisterData
  );
  if (data.code === '00000') {
    return data;
  } else {
    ElMessage.error(data.message);
  }
};

export { userRegister };
