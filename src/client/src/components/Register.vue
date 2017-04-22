<template>
  <div>

    用户名 <input v-model="username" type="text">
    密码 <input v-model="password" type="text">
    <br>
    <br>
    <button type="button" @click="register">注册</button>

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
      register(){
        api.user.createuser({
          username:this.username,
          password:this.password
        },resp=>{
          this.$router.go(-1)
        },error=>{

        })
      }
    },
    components: {}
  }
</script>
