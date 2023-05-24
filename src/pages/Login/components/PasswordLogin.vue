<template>
  <el-form ref="formRef" :model="loginForm" :rules="loginRules" size="default">
    <el-form-item prop="studentId">
      <el-input
        v-model="loginForm.studentId"
        :prefix-icon="UserFilled"
        clearable
        placeholder="请填写你的学号"
      />
    </el-form-item>
    <el-form-item prop="">
      <el-select
        v-model="loginForm.organizationId"
        placeholder="请输入学号后进行搜索"
        size="large"
      >
        <el-option
          v-for="item in origanizationOptions"
          :key="item.organizationId"
          :label="item.organizationName"
          :value="item.organizationId"
        />
      </el-select>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="loginForm.password"
        :prefix-icon="Lock"
        placeholder="请填写密码"
        type="password"
        show-password
      >
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
import { UserFilled, Lock } from '@element-plus/icons-vue';
import { FormInstance, FormRules } from 'element-plus';
import { getOrganization, userLogin } from '@/api/login/index';
const router = useRouter();
const formRef = ref<FormInstance>();
const loginForm = reactive<{
  studentId: string;
  organizationId: any;
  password: string;
}>({
  studentId: '',
  organizationId: '',
  password: ''
});
type origanizationOptionsType = {
  organizationId: number;
  organizationName: string;
};
const origanizationOptions = ref<Array<origanizationOptionsType>>([]);
// 获取当前学生所在的组织
const getUserOrganization = async (studentId: string) => {
  const { data } = await getOrganization(studentId);
  data?.organizations && (origanizationOptions.value = data?.organizations);
};
const studentIdVerification = (rule: any, value: string, callback: any) => {
  const length = value.length;
  if (length === 8) {
    getUserOrganization(value);
    return callback();
  } else {
    callback(new Error('请输入合法的学号'));
  }
};
const loginRules = reactive<FormRules>({
  studentId: [
    {
      required: true,
      message: '学号不能为空',
      trigger: 'blur'
    },
    {
      validator: studentIdVerification,
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
const login = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const data = await userLogin(loginForm);
      data?.token && localStorage.setItem('token', data?.token);
      setTimeout(() => {
        router.push({
          path: 'home'
        });
      }, 1000);
    } else {
      return false;
    }
  });
};

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
  .el-select {
    width: 100%;
  }
}
</style>
