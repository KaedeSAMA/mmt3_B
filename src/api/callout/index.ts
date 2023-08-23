import { _axios } from '@/server/http';
import { UpdateDeptInfo } from './types/updDeptInfo';
import {
  TUpdateDeptInfoRes,
  TGetDeptInfoRes,
  TUpdateDeptLogoRes
} from './types/resType';
import { AvatarUploadRequest } from './types/updDeptLogo';

export const updateDeptInfo = async (updateDeptInfo: UpdateDeptInfo) => {
  const data = await _axios.post<TUpdateDeptInfoRes, UpdateDeptInfo>(
    '/local/b/admin/organization/info/update',
    updateDeptInfo
  );
  if (data.code !== '00000') {
    ElMessage.error(data.message);
    return;
  }
  ElMessage.success('更新成功');
  return data.data;
};

export const getDeptInfo = async () => {
  const data = await _axios.get<TGetDeptInfoRes, null>(
    '/local/b/admin/organization/info/get'
  );
  if (data.code !== '00000') {
    ElMessage.error(data.message);
    throw new Error("/b/admin/organization/info/get,114514");
  }
  return data.data;
};

export const updateDeptLogo = async (formData: AvatarUploadRequest) => {
  const data = await _axios.post<TUpdateDeptLogoRes, AvatarUploadRequest>(
    '/local/b/admin/organization/avatar/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  if (data.code !== '00000') {
    ElMessage.error(data.message);
    return;
  }
  ElMessage.success('更新成功');
  return data.data;
};
