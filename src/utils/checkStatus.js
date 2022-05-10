import http from "@/common/api/request.js";
export default {
  // 检查登录状态
  async checkStatus(email) {
    let res = await http.$axios({
      url:"/api/loginPage/check",
      params:{
        email: email
      }
    })
    console.log(res.data);
    return res.data
  },
  // 登出时改变存储状态
  async loginOut(email) {
    let res = await http.$axios({
      url:'/api/loginPage/loginOut',
      method: "POST",
      data: {
        email: email
      }
    })
    console.log(res);
  }
}

