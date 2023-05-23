<!-- 组件废除 -->
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
    <el-form-item prop="verification">
      <el-input
        v-model="loginForm.verification"
        placeholder="请填写验证码"
        class="verification"
      >
        <template #append>
          <button @click.prevent="getVerificationCode">获取验证码</button>
        </template>
        <template v-slot:prefix>
          <svg-icon iconName="icon-dunpai"></svg-icon>
        </template>
      </el-input>
    </el-form-item>
    <div class="alert-text">
      <span>没有账号?</span>
      <span @click="toRegister">注册</span>
    </div>
    <div class="login">
      <el-button type="primary" @click="login(formRef)">登录</el-button>
    </div>
  </el-form>
</template>
<script lang="ts" setup>
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { Cellphone } from '@element-plus/icons-vue';
import { phoneVerification } from '@/utils/formVerification';
// import { _axios } from '@/server/http';
// 传参
const router = useRouter();
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
      validator: phoneVerification,
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
const toRegister = () => {
  router.push({
    path: 'register'
  });
};

const getVerificationCode = () => {
  console.log('获取验证码。');
};

const login = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      ElMessage.success('登录成功');
      setTimeout(() => {
        router.push({
          path: 'home'
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
