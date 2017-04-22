<template>
  <div>

    用户名 <input v-model="username" type="text">
    密码 <input v-model="password" type="text">
    <br>
    <br>
    <button type="button" @click="login">登录</button>
    <button type="button" @click="$router.push('Register')">注册</button>

  </div>
</template>
<style>

</style>
<script>

  import api from '../api/API'

  export default{
    data(){
      return {
        username: '',
        password: ''
      }
    },
    mounted: function () {
    },

    methods: {
      login(){
        api.user.getuser({
          username:this.username,
          password:this.password
        },resp=>{
          this.$router.push('Hello')
        },error=>{
        })
      }
    },
    components: {}
  }
</script>
