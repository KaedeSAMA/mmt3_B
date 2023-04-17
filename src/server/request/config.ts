let BASE_URL = '';
// 超时时间
const TIME_OUT = 10000;
// 根据环境判断添加那个请求前缀
if (process.env.NODE_ENV === 'development') {
  BASE_URL = '';
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = '';
} else {
  BASE_URL = '';
}

export { BASE_URL, TIME_OUT };
