import { ElMessage } from 'element-plus';
const router = useRouter();
function showErrorInfo(res: any): void {
  console.log(res);

  const { data = {}, response } = res;
  const { status } = response;
  switch (status) {
    case 302: {
      ElMessage.warning('登录信息过期, 请重新登录。');
      setTimeout(() => {
        router.push({
          path: '/'
        });
      }, 1000);
      break;
    }
    case 401: {
      ElMessage.warning('登录信息过期, 请重新登录');
      setTimeout(() => {
        router.push({
          path: '/'
        });
      }, 1000);
      break;
    }

    case 404: {
      ElMessage.warning('请求接口地址不存在。');
      break;
    }

    case 500: {
      ElMessage.warning('服务器发生了未知错误, 请联系管理员。');
      break;
    }

    case 503: {
      ElMessage.warning('服务器暂时无法处理客户端的请求。');
      break;
    }
    default: {
      ElMessage.warning('请求失败, 请稍后重试.');
    }
  }
}

export default showErrorInfo;
