<template>
  <div class="register">
    <div class="left-img">
      <img src="@/assets/img/login-bg.png" alt="背景图片" />
    </div>
    <div class="right-form">
      <el-card>
        <div class="form-title">{{ title }}</div>
        <el-form
          ref="registerFormRef"
          :model="registerForm"
          :rules="registerRules"
        >
          <el-form-item prop="name">
            <el-input
              v-model="registerForm.name"
              clearable
              placeholder="真实姓名"
            >
              <template v-slot:prefix>
                <svg-icon iconName="icon-jurassic_user" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="studentId">
            <el-input v-model="registerForm.studentId" placeholder="学号">
              <template v-slot:prefix>
                <svg-icon iconName="icon-idcard" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input v-model="registerForm.phone" placeholder="手机号">
              <template v-slot:prefix>
                <svg-icon iconName="icon-shouji" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="verificationCode">
            <el-input
              v-model="registerForm.verificationCode"
              placeholder="短信验证码"
              class="verification"
            >
              <template v-slot:prefix>
                <svg-icon iconName="icon-dunpai" />
              </template>
              <template #append>
                <button @click.prevent="getVerificationCode">获取验证码</button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="registerForm.password" placeholder="密码">
              <template v-slot:prefix>
                <svg-icon iconName="icon-suoding" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="passwordAgain">
            <el-input
              v-model="registerForm.passwordAgain"
              placeholder="确认密码"
            >
              <template v-slot:prefix>
                <svg-icon iconName="icon-suoding" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="invitationCode">
            <el-input
              v-model="registerForm.invitationCode"
              placeholder="组织邀请码"
            >
              <template v-slot:prefix>
                <svg-icon iconName="icon-zuzhiqunzu" />
              </template>
            </el-input>
          </el-form-item>
          <div class="submit">
            <el-button
              type="primary"
              @click.prevent="toRegister(registerFormRef)"
              >注册</el-button
            >
          </div>
        </el-form>
        <div class="alert-text">
          <span>已有账号？</span>
          <span @click="toLogin">登录</span>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { FormRules, FormInstance, ElMessage } from 'element-plus';
import {
  phoneVerification,
  userNameVerification
} from '@/utils/formVerification';
const title = ref('后台管理系统');
const registerFormRef = ref<FormInstance>();
const registerForm = reactive({
  name: '',
  studentId: '',
  phone: '',
  verificationCode: '',
  password: '',
  passwordAgain: '',
  invitationCode: ''
});
const registerRules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: '姓名不能为空',
      trigger: 'blur'
    },
    {
      validator: userNameVerification,
      trigger: 'blur'
    }
  ],
  studentId: [
    {
      required: true,
      message: '学号不能为空',
      trigger: 'blur'
    }
  ],
  phone: [
    {
      required: true,
      message: '手机号不能为空',
      trigger: 'blur'
    },
    {
      validator: phoneVerification,
      trigger: 'blur'
    }
  ],
  verificationCode: [
    {
      required: true,
      message: '短信邀请码不能为空',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    }
  ],
  passwordAgain: [
    {
      required: true,
      message: '请确认密码',
      trigger: 'blur'
    }
  ],
  invitationCode: [
    {
      required: true,
      message: '组织邀请码不能为空',
      trigger: 'blur'
    }
  ]
});
const router = useRouter();
const toLogin = () => {
  router.push({
    path: 'login'
  });
};
const getVerificationCode = () => {
  console.log('获取验证码。');
};
const toRegister = (formEl: FormInstance | undefined) => {
  console.log(formEl);

  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      ElMessage.success('注册成功');
      setTimeout(() => {
        router.push({
          path: 'login'
        });
      }, 1000);
    } else {
      console.log('error submit!');
      return false;
    }
  });
};
</script>
<style scoped lang="scss">
.register {
  display: flex;
  height: 100%;
  justify-content: center;
  background-image: url('@/assets/img/login-bg-all.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .left-img {
    height: 100%;
    display: flex;
    align-items: center;
    img {
      height: 400px;
      transform: translateX(100px);
    }
  }
  .right-form {
    display: flex;
    align-items: center;
    margin-left: 40px;
    margin-right: 200px;
    .el-card {
      width: 350px;
      padding: 30px 20px 30px 20px;
      border-radius: 10px;
      .form-title {
        text-align: left;
        margin-bottom: 20px;
        font-size: 20px;
        font-weight: 600;
        color: #129bfb;
      }
      :deep(.el-form-item) {
        margin-bottom: 15px;
      }
      :deep(.el-input) {
        height: 40px;
      }
    }
  }
  .alert-text {
    text-align: right;
    font-size: 12px;
    margin-top: 14px;
    span {
      color: #aaa;
      margin-right: 10px;
      &:last-child {
        color: #02a7f0;
        cursor: pointer;
      }
    }
  }
}

@media (max-width: 800px) {
  .register {
    background-size: auto 100%;
    .left-img {
      display: none;
    }
    .right-form {
      margin-right: 0px;
      margin-left: 0px;
    }
  }
}
.change-component {
  text-align: center;
  margin-top: 10px;
  span {
    text-decoration: none;
    font-size: 12px;
    color: #02a7f0;
    cursor: pointer;
  }
}

.submit {
  margin-top: 25px;
  text-align: center;
  width: 100%;
  .el-button {
    width: 150px;
    letter-spacing: 0.5rem;
  }
}
.verification {
  :deep(.el-input__wrapper) {
    border: 1px solid #dcdfe6;
    border-right: transparent;
    box-shadow: none;
  }
  :deep(.el-input-group__append) {
    background-color: white;
    box-shadow: none;
    border: 1px solid #dcdfe6;
    border-left: transparent;
    box-sizing: border-box;
    padding-right: 10px;
    button {
      border: none;
      font-size: 12px;
      background: white;
      color: #02a7f0;
      cursor: pointer;
    }
  }
}
:deep(.is-error) {
  .verification {
    .el-input-group__append {
      border: 1px solid #f56c6c;
      border-left: transparent;
      transition: border 0.2s;
    }
    .el-input__wrapper {
      border: 1px solid #f56c6c;
      border-right: transparent;
      box-shadow: none;
      transition: border 0.2s;
    }
  }
}
</style>
