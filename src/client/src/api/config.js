import Qs from 'qs'

export default{
  baseURL: 'http://localhost:8888/',
  method: 'GET',
  transformRequest: [
    function(data) {
      return data;
    }
  ],
  transformResponse: [
    function(data) {
      return data;
    }
  ],
  headers: {
    'Accept': 'application/json,text/html',
  },
  params: {
  },
  paramsSerializer: function(params) {
    return Qs.stringify(params)
  },

  timeout: 5000,
  withCredentials: false, // default
  responseType: 'json', // default

  maxContentLength: 2000,
  validateStatus: function(status) {
    return status >= 200 && status < 300; // default
  },
  maxRedirects: 5, // default
}
