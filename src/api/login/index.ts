import { _axios } from '@/server/http';
import type { TGetOrganizationRes, TUserLoginRes } from '../types/resType';
import type { TGetOrganization } from '../types/paramsType';
import type { TUserLogin } from '../types/dataType';
const userLogin = async (loginForm: TUserLogin) => {
  const { data } = await _axios.post<TUserLoginRes, TUserLogin>(
    '/mock/b/user/loginp',
    loginForm
  );
  console.log(data);
  return data;
};
const getOrganization = async (studentId: string) => {
  const data = await _axios.get<TGetOrganizationRes, TGetOrganization>(
    '/local/b/user/orgs',
    {
      studentId
    }
  );
  return data;
};
export { getOrganization, userLogin };
