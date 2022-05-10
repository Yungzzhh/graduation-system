import axios from 'axios';
// import router from '@/router'
export default {
  common: {
    methods: 'GET',//方法
    data:{},//请求体post
    params:{},//请求信息get
    headers:{}//头部
  },
  $axios(options={}) {
    options.method = options.method || this.common.method;
		options.data = options.data || this.common.data;
		options.params = options.params || this.common.params;
		options.headers = options.headers || this.common.headers;
    return axios(options).then(v=> {
      return new Promise((res, rej) => {
        res(v.data)
      })
    })
  } 
}