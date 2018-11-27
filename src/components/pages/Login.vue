<template>
  <div>
    <van-nav-bar title="用户登录" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>

    <div class="register-panel">
      <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="username = ''"
      ></van-field>

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      ></van-field>
      <div class="register-button">
        <van-button :loading="openLoading" @click="toLogin" type="primary" size="large">马上登录</van-button>
      </div>
    </div>

  </div>
</template>

<script>
  import localForage from "localforage"
  import {login} from '../../ajax/api';
  import type from '../../untils/type'
  export default {
    data() {
      return {
        username: '',
        password: '',
        openLoading: false,
      }
    },
    created () {
      let user_info = null;
      localForage.getItem('user_info').then((value) => {
        user_info = value;
        if (user_info) {
          this.$toast.success('您已经登录');
          setTimeout(() => {
            this.$router.push('/')
          }, 1000);
        }
      })
    },
    mounted () {
      console.log(type.checkStr(13548191041, 'phone'))
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      toLogin() {
        let data = {userName: this.username, password: this.password};
        let toast = this.$toast.loading({
          mask: true,
          message: '登录中...',
          duration: 0
        });
        this.openLoading = true;
        login(data).then((res) => {
          setTimeout(() => {
            toast.clear();
            if (res.code === 200) {
              localForage.setItem('user_info', data, () => {
                this.$toast.success('登录成功');
                this.$router.push('/')
              });
            } else {
              console.log(res.message);
              this.openLoading = false;
              this.$toast.fail(res.message)
            }
          }, 1000);
        }).catch((error) => {
          console.log(error);
          this.openLoading = false;
          this.$toast.fail('登录失败')
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
