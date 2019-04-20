<template>
  <div class="container">
    <el-card shadow="always">
      <h1>{{ isLogin ? 'Login' : 'Register' }}</h1>
      <transition name="show" mode="out-in">
        <el-form v-if="isLogin" key="login" :model="loginForm" status-icon :rules="loginRules" ref="registerForm" label-width="80px" class="demo-registerForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="loginForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="change" @click="isLogin = !isLogin">
              <span>注册</span>
            </div>
            <el-button type="primary" @click="login('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>
        <el-form v-else key="register" :model="registerForm" status-icon :rules="registerRules" ref="registerForm" label-width="80px" class="demo-registerForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="registerForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="registerForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="change" @click="isLogin = !isLogin">
              <span>登录</span>
            </div>
            <el-button type="primary" @click="register('registerForm')">注册</el-button>
          </el-form-item>
        </el-form>
      </transition>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    var checkusername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      isLogin: true,
      loginForm: {
        pass: '',
        username: ''
      },
      registerForm: {
        pass: '',
        checkPass: '',
        username: ''
      },
      loginRules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        username: [
          { validator: checkusername, trigger: 'blur' }
        ]
      },
      registerRules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        username: [
          { validator: checkusername, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$axios.post('/login', this.loginForm)
        .then((res) => {
          console.log('login')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    register () {
      this.$axios.post('/register', this.registerForm)
        .then((res) => {
          console.log('register')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.el-card {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
h1 {
  text-align: center;
  color: rgb(104, 169, 243);
}
.el-form {
  padding-right: 20px;
  position: relative;
}
.change {
  float: right;
  cursor: pointer;
}
.change span {
  color: rgb(104, 169, 243);
  font-size: 1.2em;
}
@keyframes show {
  0% {
      opacity: 0;
      left: 100%;
  }
  100% {
      opacity: 1;
      left: 0;
  }
}
@keyframes hide {
  0% {
      opacity: 1;
      left: 0;
  }
  100% {
      opacity: 0;
      left: -100%;
  }
}
.show-enter-active {
  animation: show 1s;
}
.show-leave-active {
  animation: hide 1s;
}
.show-enter, .show-leave-to {
  opacity: 0;
}
</style>
