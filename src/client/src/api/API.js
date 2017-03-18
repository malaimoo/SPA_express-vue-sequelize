/**
 * Created by wiki on 2017/2/23.
 */

import config from './config'
import http from './http'

export default {
  user:{
    getuser(param, success, error){
      config.url = 'users';
      http.get(param, config, success, error);
    },
  },

}
