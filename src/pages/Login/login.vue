<template>
  <div class="login">
    <div class="left-img">
      <img src="@/assets/img/login-bg.png" alt="背景图片" />
    </div>
    <div class="right-form">
      <el-card>
        <div class="form-title">{{ title }}</div>
        <component :is="components[activeComponent]"> </component>
        <div class="change-component" @click="changeComponent">
          <span>{{ changeText }}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import Verification from './components/Verification.vue';
import PasswordLogin from './components/PasswordLogin.vue';
const components = {
  Verification,
  PasswordLogin
};
const title = ref('后台管理系统');
const changeText = ref('用账号密码登录');
const activeComponent = ref('Verification');
const changeComponent = () => {
  activeComponent.value =
    activeComponent.value === 'Verification' ? 'PasswordLogin' : 'Verification';
  changeText.value =
    activeComponent.value === 'Verification'
      ? '用账号密码登录'
      : '用手机验证码登录';
};
</script>
<style scoped lang="scss">
.login {
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
        margin-bottom: 40px;
        font-size: 20px;
        font-weight: 600;
        color: #129bfb;
      }
      :deep(.el-form-item) {
        margin-bottom: 20px;
      }
      :deep(.el-input) {
        height: 40px;
      }
    }
  }
}

@media (max-width: 800px) {
  .login {
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
</style>
