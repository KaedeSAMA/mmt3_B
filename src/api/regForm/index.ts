import { ResAllDepartment, PostRegFormData } from './types/regFormType';
import { _axios } from '@/server/http';

/**
 * @description 获取所有部门
 */

const getAllDepartment = async () => {
  const data = await _axios.get<ResAllDepartment, null>(
    '/local/b/interview/departments'
  );
  if (data.code !== '00000') {
    ElMessage.error(data.message);
    return;
  }
  ElMessage.success('获取部门成功');
  return data.data;
};

const postRegForm = async (regFormData: PostRegFormData) => {
  const data = await _axios.post<any, PostRegFormData>(
    '/local/b/admin/organization/registration/form/save',
    regFormData
  );
  if (data.code !== '00000') {
    ElMessage.error(data.message);
    return;
  }
  ElMessage.success('提交报名表成功');
  return data.data;
};

export { getAllDepartment, postRegForm };
