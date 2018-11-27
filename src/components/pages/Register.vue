<template>
  <div>
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>

    <div class="register-panel">
      <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        :error-message="usernameErrorMsg"
        @click-icon="username = ''"
      ></van-field>

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :error-message="passwordErrorMsg"
      ></van-field>
      <div class="register-button">
        <van-button :loading="openLoading" @click="toReg" type="primary" size="large">马上注册</van-button>
      </div>
    </div>

  </div>
</template>

<script>
  import {register} from '../../ajax/api';
  import {isEmail, stringCheck} from '../../untils/validate'
  import {usernameErrorMsg, passwordErrorMsg} from '../../untils/errorMsg'
  export default {
    data() {
      return {
        username: '',
        password: '',
        openLoading: false,    //是否开启用户的Loading
        usernameErrorMsg: '',   //当用户名出现错误的时候
        passwordErrorMsg: '',   //当密码出现错误的时候
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      check() {
        let valid = true;
        if (!isEmail(this.username)) {
          this.usernameErrorMsg = usernameErrorMsg;
          valid = false;
        } else {
          this.usernameErrorMsg = '';
        }

        if (!stringCheck(this.password)) {
          this.passwordErrorMsg = passwordErrorMsg;
          valid = false;
        } else {
          this.passwordErrorMsg = '';
        }

        return valid
      },
      toReg() {
        if (!this.check()) return;
        let data = {userName: this.username, password: this.password};
        let toast = this.$toast.loading({
          mask: true,
          message: '加载中...',
          duration: 0
        });
        this.openLoading = true;
        register(data).then((res) => {
          console.log(res);
          setTimeout(() => {
            toast.clear();
            if (res.code === 200) {
              this.$dialog.alert({
                message: '注册成功',
                beforeClose: (action, done) => {
                  done();
                  this.$router.push('login');
                }
              });
            } else {
              console.log(res.message);
              this.openLoading = false;
              this.$toast.fail('注册失败')
            }
          }, 1000);
        }).catch((res) => {
          alert(res)
        })
      }
    },
  }
</script>

<style scoped>
  .register-panel{
    width:96%;
    border-radius: 5px;
    margin:20px auto;
    padding-bottom:50px;
  }
  .register-button{
    padding-top:10px;
  }
</style>
