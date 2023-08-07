// ？ 该文件用于提供 账号管理页面 有关的请求

import { _axios } from '@/server/http';
import { TAllAssociationMembersRes } from '@/api/types/resType';

// ### 获取所有社团成员信息⬇️
const getAllAssociationMember = async (pageNum: number) => {
  const data = await _axios.get<TAllAssociationMembersRes, { pageNum: number }>(
    '/local/b/admin/account/members/info',
    { pageNum }
  );
  if (data.code !== '00000') {
    ElMessage.error(data.message);
    return;
  }
  ElMessage.success('获取社团成员成功');
  return data.data;
};

export { getAllAssociationMember };
