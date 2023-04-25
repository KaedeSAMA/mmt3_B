<template>
  <el-form ref="formRef" :model="loginForm" :rules="loginRules" size="default">
    <el-form-item prop="phone">
      <el-input
        v-model="loginForm.phone"
        :prefix-icon="Cellphone"
        clearable
        placeholder="请填写你的手机号"
      />
    </el-form-item>
    <el-form-item prop="verification" class="verification">
      <el-input
        v-model="loginForm.password"
        :prefix-icon="Lock"
        placeholder="请填写验证码"
      >
        <template v-slot:append>
          <button>获取验证码</button>
        </template>
      </el-input>
    </el-form-item>
    <div class="alert-text">
      <span>没有账号?</span>
      <a href="">注册</a>
    </div>
    <div class="login">
      <el-button type="primary">登录</el-button>
    </div>
  </el-form>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { Lock, Cellphone } from '@element-plus/icons-vue';
// import { _axios } from '@/server/http';
// 传参

// 传入方法
const formRef = ref<FormInstance>();
const loginForm = reactive({
  phone: '',
  verification: ''
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
  verification: [
    {
      required: true,
      message: '验证码不能为空',
      trigger: 'blur'
    }
  ]
});
// 方法
</script>
<style scoped lang="scss">
.alert-text {
  text-align: right;
  font-size: 12px;
  span {
    color: #aaa;
    margin-right: 10px;
  }
  a {
    color: #02a7f0;
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
</style>
