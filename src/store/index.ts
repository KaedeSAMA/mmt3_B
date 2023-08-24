// ? 鉴于目前项目较小，不需要太多的状态管理，有关store全部写在该文件中，未来有需求需要拆分
import { defineStore } from 'pinia';

// ### 当前用户信息仓库
const useUserInfoStore = defineStore('userInfoStore', () => {
  const permissionId = ref(0);
  const permissionName = ref('');
  const nowOrgnazitionId = ref(0);

  function setPermissionId(val: number) {
    permissionId.value = val;
  }
  function setPermissionName(val: string) {
    permissionName.value = val;
  }
  function setNowOrganizationId(val: number) {
    nowOrgnazitionId.value = val;
  }
  return {
    permissionId,
    permissionName,
    nowOrgnazitionId,
    setPermissionId,
    setPermissionName,
    setNowOrganizationId
  };
});

export { useUserInfoStore };
