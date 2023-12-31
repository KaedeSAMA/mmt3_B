import { _axios } from '@/server/http';
import type { TGetOrganizationRes, TUserLoginRes } from '../types/resType';
import type { TGetOrganization } from '../types/paramsType';
import type { TUserLogin } from '../types/dataType';
// ### 用于存储用户登录时的社团ID
import { useUserInfoStore } from '@/store/index';

const userLogin = async (loginForm: TUserLogin) => {
  const data = await _axios.post<TUserLoginRes, TUserLogin>(
    '/local/b/user/loginp',
    loginForm
  );
  if (data.code !== '00000') {
    ElMessage.error(data.message);
    return;
  }
  const userInfoStore = useUserInfoStore();
  userInfoStore.setNowOrganizationId(loginForm.organizationId);
  ElMessage.success('登录成功');
  return data.data;
};
const getOrganization = async (studentId: string) => {
  const data = await _axios.get<TGetOrganizationRes, TGetOrganization>(
    '/local/b/user/orgs',
    {
      studentId
    }
  );
  if (data.code !== '00000') {
    ElMessage.error(data.message);
    return;
  }
  return data.data;
};
export { getOrganization, userLogin };
