<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 表单登录块 -->
      <div class="login-form">
        <el-form ref="loginFormRef" :rules="loginFormRules" :model="loginForm" label-width="0px" class="login_form"
          @keyup.enter.native="handleLogin">
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="loginForm.username"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" type="password"
              v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <!-- 角色选择 -->
          <el-form-item prop="role">
            <el-radio-group v-model="loginForm.role">
              <el-radio label="student">学生</el-radio>
              <el-radio label="admin">管理员</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="login-btns">
        <el-button size="small" type="primary" :loading="loading" :disabled="!loginForm.role"
          @click="handleLogin">登录</el-button>
        <el-button size="small" @click="resetForm">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// 模拟用户数据（实际项目中应从后端API获取）
const USER_MAP = {
  admin: { password: '123456', role: 'admin', redirect: '/admin' },
  student: { password: '123456', role: 'student', redirect: '/student' }
}

export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      loginForm: {
        username: '',
        password: '',
        role: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请选择登录身份', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginFormRef.validate((valid) => {
        if (!valid) return

        this.loading = true
        // 模拟异步登录请求（方便后续替换为真实API）
        setTimeout(() => {
          const { username, password, role } = this.loginForm
          const user = USER_MAP[username]

          if (user && user.password === password && user.role === role) {
            // 保存登录状态
            sessionStorage.setItem('token', Date.now().toString())
            sessionStorage.setItem('role', role)
            sessionStorage.setItem('username', username)

            this.$message.success('登录成功！')
            this.$router.push(user.redirect)
          } else {
            this.$message.error('用户名或密码错误，或登录身份选择不正确')
          }
          this.loading = false
        }, 300)
      })
    },
    resetForm() {
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}

.login-container {
  height: 100%;
  background-image: url('../assets/a1.jpg');
}

.login-box {
  width: 460px;
  height: 320px;
  position: absolute;
  left: 50%;
  top: 50%;
  background-color: #333744;
  transform: translate(-50%, -50%);
  border-radius: 50px;
}

.ear-left,
.ear-right {
  width: 120px;
  height: 120px;
  background-color: #333744;
  border-radius: 50%;
  border: 2px solid #FFFFFF;
  box-shadow: 0 0 10px #FFFFFF;
}

.ear-left {
  position: absolute;
  left: 60px;
  top: -60px;
}

.ear-right {
  position: absolute;
  right: 60px;
  top: -60px;
}

.eyebrow {
  width: 80px;
  height: 5px;
  background-color: #FFFFFF;
  position: absolute;
  left: 20px;
  top: 58px;
}

.eyes {
  width: 5px;
  height: 5px;
  background-color: #FFFFFF;
  position: absolute;
  left: 95px;
  top: 65px;
}

.login-form {
  width: 380px;
  height: 180px;
  background-color: #FFFFFF;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  /* padding: 0 15px; */
}

.login_form {
  position: absolute;
  top: 20px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.login-btns {
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
}

.btns {
  display: flex;
  justify-content: flex-end;
}</style>