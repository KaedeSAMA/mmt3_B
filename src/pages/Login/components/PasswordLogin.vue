<template>
  <el-form ref="formRef" :model="loginForm" :rules="loginRules" size="default">
    <el-form-item prop="phone">
      <el-input
        v-model="loginForm.phone"
        :prefix-icon="UserFilled"
        clearable
        placeholder="请填写你的账号(手机号/学号)"
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="loginForm.password"
        :prefix-icon="Lock"
        placeholder="请填写密码"
      >
      </el-input>
    </el-form-item>
    <div class="alert-text">
      <span>没有账号?</span>
      <span @click="toRegister">注册</span>
    </div>
    <div class="login">
      <el-button type="primary">登录</el-button>
    </div>
  </el-form>
</template>
<script lang="ts" setup>
import { UserFilled, Lock } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus';
const router = useRouter();
const formRef = ref<FormInstance>();
const loginForm = reactive({
  phone: '',
  password: ''
});
const loginRules = reactive<FormRules>({
  phone: [
    {
      required: true,
      message: '手机号不能为空',
      trigger: 'blur'
    },
    {
      required: true,
      message: '请填写正确的手机号',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    }
  ]
});
// 方法
const toRegister = () => {
  router.push({
    path: 'register'
  });
};
</script>
<style scoped lang="scss">
.alert-text {
  text-align: right;
  font-size: 12px;
  span {
    color: #aaa;
    margin-right: 10px;
    &:last-child {
      color: #02a7f0;
      cursor: pointer;
    }
  }
}
.login {
  margin-top: 25px;
  text-align: center;
  width: 100%;
  .el-button {
    width: 150px;
    letter-spacing: 0.5rem;
  }
}
</style>
