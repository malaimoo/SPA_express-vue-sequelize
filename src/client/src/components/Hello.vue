<template>
  <div class="hello">
      <p> 登录成功 ！！！</p>

  </div>
</template>

<script>

  import api from '../api/API'

  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        serverusername:'',
        username:''
      }
    },
    methods: {
      getuser: function () {
        api.user.getuser(
          {username:this.username},
          resp=> {
            console.log(resp);
            this.serverusername = resp.user
          },
          function (error) {
          })
      },
      creatuser(){
          api.user.createuser({
            username:this.username,
            password:'123123'
          },resp=>{

          },error=>{
          })
      }
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
