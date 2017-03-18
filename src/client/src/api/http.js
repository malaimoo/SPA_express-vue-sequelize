/**
 * Created by wiki on 2017/2/25.
 */
import axios from 'axios'

export default {
  config:{
    isloading:false
  },
  get: function (param, config, success, error) {
    config.params = param;
    config.method = 'GET';
    this.config.isloading = true;
    var _this = this;
    axios.request(config).then(function (res) {
      _this.config.isloading = false;
      console.log(res.data);
      if (res.data.status === 1) {
        success(res.data);
      }else{
        console.log(res.data.statusMsg);
        error(res.data);
      }
    }).catch(function (errors) {
      _this.config.isloading = false;
      console.log('网络错误!');
      error(errors);
      console.log('--------------request start--------------')
      console.log(config.url)
      console.log(errors);
      console.log('--------------request end--------------')
    })

  }
}
