// 手机号校验
const phoneVerification = (rule: any, value: any, callback: any) => {
  const regMobile =
    /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

  if (regMobile.test(value)) {
    return callback();
  }

  callback(new Error('请输入合法的手机号'));
};

// 用户名校验
const userNameVerification = (rule: any, value: any, callback: any) => {
  const excludedChars = ['𥖄', '𤰉'];
  const excludedCharsStr = excludedChars.join('');
  const reg = new RegExp(`^([\u3400-\u9fa5${excludedCharsStr}]){2,15}$`, 'g');
  if (reg.test(value)) {
    return callback();
  }
  callback(new Error('请输入有用的真实姓名'));
};
export { phoneVerification, userNameVerification };
