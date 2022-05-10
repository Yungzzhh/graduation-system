// 获取用户信息
const User = {
  queryEmail(option) {
    return 'select * from userform where email = \''+option.email+'\'';
  },
  queryPassword(option) {
    return 'select * from userform where (email = \''+option.email+'\') and password = \''+option.password+'\'';
  },
  // 注册
  userRegistration(option) {
    let userEmail = option.email
    let userPassword = option.password
    let userIndentify = option.identify
    let avatar
    if(!option.avatar) {
      avatar = "http://localhost:3000/avatars/initial.jpg"
    }
    
    return 'insert into userform (email,password,identify,avatar) values ("'+userEmail+'","'+userPassword+'","'+userIndentify+'","'+avatar+'")'
  },
  // 登录状态改变
  Login(option) {
    let email = option.email
    return `update userform set status = "loginIN" where email = "${email}"`
  },
  // 登录状态改变
  logOut(option) {
    let email = option.email
    return `update userform set status = "loginOUT" where email = "${email}"`
  },
  // 检查登录状态
  checkLogin(option) {
    let email = option.email
    return `select status from userform where email = "${email}"`
  }
}
module.exports = User