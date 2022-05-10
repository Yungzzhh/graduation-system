<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">毕业设计管理系统</h3>
      </div>
      <!-- 登录账号表单 -->
      <el-form-item prop="username">
        <el-input
          id="account"
          ref="username"
          v-model="loginForm.email"
          placeholder="email"
          name="email"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          id="psw"
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>
      <!-- 登录注册按钮功能模块 -->
      <div class="btn">
        <el-button
          id="login_btn"
          :loading="loading"
          type="primary"
          style="width:50%;margin-bottom:30px;"
          @click.native.prevent="handleLogin"
          >登录</el-button
        >
        <el-button
          :loading="loading"
          type="primary"
          style="width:50%;margin-bottom:30px;"
          @click="drawer = true"
        >
          注册
        </el-button>
        <el-drawer
          title="用户注册"
          :visible.sync="drawer"
          :direction="direction"
        >
            <el-form class="registerDrawer" ref="registerForm" :rules="rules" :model="registerForm" >
              <el-form-item label="用户email" prop="email">
                <el-input v-model.trim="registerForm.email"></el-input>
              </el-form-item>
              <el-form-item label="用户密码" prop="pwd">
                <el-input v-model.trim="registerForm.pwd"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="pwdConfirm">
                <el-input v-model.trim="registerForm.pwdConfirm"></el-input>
              </el-form-item>
              <div class="identify">
                <div>老师</div>
                <el-switch
                  v-model="identify"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  style="margin:0 10px;"
                  >
                </el-switch>
                <div>学生</div>
              </div>
              <el-button type="primary" class="registBtn" @click="registerBtn('registerForm')">注册</el-button>
            </el-form>
        </el-drawer>
      </div>
    </el-form>
  </div>
</template>

<script>
import http from "@/common/api/request.js";
import status from '@/utils/checkStatus.js';
// import {mapMutations} from 'vuex'

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error("Please enter the correct user name"));
        this.loading = false
      } else {
        callback();
        this.loading = false
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
        this.loading = false
      } else {
        callback();
        this.loading = false
      }
    };
    return {
      // 用户注册信息填写与校验
      registerForm: {
        email:'',
        pwd:'',
        pwdConfirm:'',
      },
      rules: {
          email: [
            { required: true, message: '请输入用户email', trigger: 'blur' }, 
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min:6, message: '密码要6位以上', trigger: 'blur'}
          ],
          pwdConfirm: [
            { required: true, message: '请输入确认密码', trigger: 'blur' },
            { min:6, message: '密码要6位以上', trigger: 'blur'}
          ],
      },
      //用户注册窗口
      drawer: false,
      direction: 'rtl',
      //用户登录信息填写与校验
      loginForm: {
        email: "",
        password: ""
      },
      loginRules: {
        email: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      identify: true,//true为学生，false为老师
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  methods: {
    // ...mapMutations(['getList']),
    // 注册按钮校验
    registerBtn(form) {
      this.$refs[form].validate((valid) => {
          if (valid && this.registerForm.pwd === this.registerForm.pwdConfirm) {
            http.$axios({
              url:'/api/loginPage/register',
              method:'POST',
              data: {
                email:this.registerForm.email,
                password:this.registerForm.pwd,
                identify:this.identify
              }
            }).then(res => {
              if(res.data.success) {
                this.$message({
                  message: '注册成功',
                  type: 'success'
                });
              } else {
                this.$message.error('已有注册账号，请直接登录');
              }
            })
          } else {
            this.$message.error('注册失败,请确认格式');
            return false;
          }
        });
    },
    // 关闭注册框
    handleClose() {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    // 登录功能
    handleLogin() {
      this.loading = true;
      //数据格式验证
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.getIn()
        } else {
          this.$message.error("登录失败,请检查账号密码格式");
        }
      });
    },
    async getIn() {
      let res = await http.$axios({
        url: '/api/loginPage/login',
        method: 'POST',
        data: {
          email:this.loginForm.email,
          password:this.loginForm.password
        }
      })
      if(!res.data.success) {
        this.$message.error('登录失败，请重复确认账号信息');
        this.loading = false
      } else {
        console.log(res);
        this.$message({
          message: '登录成功',
          type: 'success'
        });
        sessionStorage.setItem('email',this.loginForm.email)
        this.$router.push({
          path:'/home',
          query: {
            email: window.btoa(this.loginForm.email),
            identify: res.data.identify
          }
        })
      }
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
.info {
  position: fixed;
  bottom: 20px;
  width: 100%;
  text-align: center;
  color: gainsboro;
}
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }


  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.btn {
  display: flex;
  justify-content: space-between;
}
.registerDrawer {
  margin:0 20px;
  .identify {
    display: flex;
  }
  .registBtn {
    margin: 20px;
  }
}
</style>


