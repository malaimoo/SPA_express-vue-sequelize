// /**
//  * Created by wiki on 2017/2/27.
//  */

import config from '../../config'
var DebugLogger ={};
function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  //  添加实例方法
  Vue.prototype.$logger = function (message) {
    if(config.dev.env.NODE_ENV) {
      console.log(message);
    }
  }
}
DebugLogger.install = install;
export default DebugLogger;
