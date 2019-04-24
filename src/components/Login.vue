<template>
  <div class="container">
    <el-card shadow="always">
      <h1>{{ isLogin ? 'Login' : 'Register' }}</h1>
      <transition-group name="show" mode="out-in">
        <el-form v-show="isLogin" key="login" :model="loginForm" status-icon :rules="loginRules" ref="registerForm" label-width="80px" class="demo-registerForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="yzm-item" label="验证码" prop="identityCode">
            <!-- <div class="yzm-item"> -->
              <el-input v-model="loginForm.identityCode" autocomplete="off"></el-input>
            <!-- </div> -->
            <canvas id="canvasYZM" class="login-yzm-img">{{login.yzm}}</canvas>
            <span class="changeOne" @click="changeOne">看不清？换一张</span>
          </el-form-item>
          <el-form-item>
            <div class="change" @click="isLogin = !isLogin">
              <span>注册</span>
            </div>
            <el-button type="primary" @click="login('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>
        <el-form v-show="!isLogin" key="register" :model="registerForm" status-icon :rules="registerRules" ref="registerForm" label-width="80px" class="demo-registerForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="registerForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
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
      </transition-group>
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
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateIdentityCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      isLogin: true,
      yzmKey: '',
      yzmCode: '',
      canvas: '',
      loginForm: {
        password: '',
        username: '',
        identityCode: ''
      },
      registerForm: {
        password: '',
        checkPass: '',
        username: ''
      },
      loginRules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        username: [
          { validator: checkusername, trigger: 'blur' }
        ],
        identityCode: [
          { validator: validateIdentityCode, trigger: 'blur' }
        ]
      },
      registerRules: {
        password: [
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
      const _this = this
      const yzmKey = this.yzmKey
      this.$axios.post('/login', {
        ...this.loginForm,
        key: yzmKey
      }).then((res) => {
        console.log('login', res)
        this.$options.methods.getIdentityCode.call(_this, { key: this.yzmKey })
      }).catch((err) => {
        console.log(err)
      })
    },
    register () {
      this.$axios.post('/register', this.registerForm)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getIdentityCode (data) {
      this.$axios.post('/getIdentityCode', data)
        .then((res) => {
          console.log(res)
          this.yzmCode = res.data.data.code
          this.yzmKey = res.data.data.key
          this.$nextTick(function () {
            console.log(this.canvas)
            const context = this.canvas.getContext('2d')
            console.log(context)
            context.clearRect(0, 0, this.canvas.width, this.canvas.height)
            context.font = '120px 微软雅黑'
            context.fillText(this.yzmCode, 5, 130)
          })
        }).catch(err => {
          console.log(err)
        })
    },
    changeOne () {
      const _this = this
      this.$options.methods.getIdentityCode.call(_this, { key: this.yzmKey })
    }
  },
  mounted () {
    this.canvas = document.getElementById('canvasYZM')
    this.getIdentityCode()
  }
}
</script>

<style scoped>
.el-card {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  min-width: 400px;
  min-height: 400px;
}
h1 {
  text-align: center;
  color: rgb(104, 169, 243);
}
.el-form {
  width: 85%;
  padding-right: 40px;
  position: absolute;
}
.yzm-item .el-input{
  width: 30%;
}
.login-yzm-img {
  width: 30%;
  height: 40px;
  vertical-align: bottom;
  margin: 0 5px;
  /* position: absolute; */
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
.changeOne {
  font-size: 0.6em;
  cursor: pointer;
}
</style>
