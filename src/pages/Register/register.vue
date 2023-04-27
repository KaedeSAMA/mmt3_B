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
            />
          </el-form-item>
          <el-form-item prop="studentId">
            <el-input v-model="registerForm.studentId" placeholder="学号">
            </el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input v-model="registerForm.studentId" placeholder="手机号">
            </el-input>
          </el-form-item>
          <el-form-item prop="verificationCode">
            <el-input v-model="registerForm.studentId" placeholder="短信验证码">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="registerForm.studentId" placeholder="密码">
            </el-input>
          </el-form-item>
          <el-form-item prop="passwordAgain">
            <el-input v-model="registerForm.studentId" placeholder="确认密码">
            </el-input>
          </el-form-item>
          <el-form-item prop="invitationCode">
            <el-input v-model="registerForm.studentId" placeholder="组织邀请码">
            </el-input>
          </el-form-item>
          <div class="submit">
            <el-button type="primary">注册</el-button>
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
import { FormRules } from 'element-plus';

const title = ref('后台管理系统');
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
      required: true,
      message: '请填写正确的姓名',
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
      width: 290px;
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
</style>
