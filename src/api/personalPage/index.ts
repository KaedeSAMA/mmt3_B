// ？ 该文件用于提供个人自管理页面有关的方法

// ### 引入必要的类型和方法

import { _axios } from '@/server/http';
import {
  IBaseResponce,
  TUserBasicInfoRes,
  TSwitchOrganizationRes,
  TGetOrganizationRes
} from '../types/resType';
import {
  TJoinOrganization,
  TSwitchOrganization,
  TUpdatePassword
} from '../types/dataType';
import { useUserInfoStore } from '@/store/index';

// ### 获取用户信息⬇️
const getUserBasicInfo = async () => {
  const data = await _axios.get<TUserBasicInfoRes, null>(
    '/local/b/user/userinfo'
  );
  if (data.code !== '00000') {
    ElMessage.error(data.message);
    return;
  }
  ElMessage.success('获取用户信息成功');
  return data.data;
};
// ### 获取用户信息⬆️
// #################

// ### 获取当前用户加入的所有组织⬇️
const getUserOrganizations = async () => {
  const data = await _axios.get<TGetOrganizationRes, null>(
    '/local/b/user/loginedorgs'
  );
  if (data.code !== '00000') {
    ElMessage.error(data.message);
    return;
  }
  // ElMessage.success('获取用户部门');
  return data.data;
};
// ### 获取当前用户加入的所有组织⬆️
// ############################

// ### 为用户加入新的组织⬇️
const joinOrganization = async (dataConfig: TJoinOrganization) => {
  const data = await _axios.post<IBaseResponce<null>, TJoinOrganization>(
    '/local/b/user/addNewOrg',
    dataConfig
  );
  if (data.code !== '00000') {
    ElMessage.error(data.message);
    return;
  }
  ElMessage.success('加入组织成功');
  // console.log(data);
  return data;
};
// ### 为用户加入新的组织⬆️
// #####################

// ### 用户切换组织⬇️
const userInfoStore = useUserInfoStore();
const switchOrganization = async (dataConfig: TSwitchOrganization) => {
  const data = await _axios.post<TSwitchOrganizationRes, TSwitchOrganization>(
    '/local/b/user/switchOrg',
    dataConfig
  );
  if (data.code !== '00000') {
    ElMessage.error(data.message);
    return;
  }
  if (data.data) {
    window.localStorage.setItem('token', data.data?.token);
    userInfoStore.setPermissionId(data.data.permissionId);
    userInfoStore.setPermissionName(data.data.permissionName);
    userInfoStore.setNowOrganizationId(dataConfig.organizationId);
    ElMessage.success('切换组织成功');
  } else {
    ElMessage.error(data.message);
    return;
  }
  return data;
};
// ### 用户切换组织⬆️
// #############################

// ### 更改密码⬇️
const updatePassword = async (dataConfig: TUpdatePassword) => {
  const data = await _axios.put<IBaseResponce<null>, TUpdatePassword>(
    '/local/b/user/password',
    dataConfig
  );
  if (data.code !== '00000') {
    ElMessage.error(data.message);
    return;
  }
  ElMessage.success('更改密码成功');
  // console.log(data);
  return data;
};
export {
  getUserBasicInfo,
  getUserOrganizations,
  joinOrganization,
  switchOrganization,
  updatePassword
};
