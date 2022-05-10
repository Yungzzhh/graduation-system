const information = {
  get(option) {
    let email = option.email
    return `select * from userform where email = "${email}"`
  },
  set(option) {
    let name = option.name === null ? "" : option.name
    let id = option.id == null ? "0" : option.id
    let email = option.email
    let wechat = option.wechat == null ? "" : option.wechat
    let qq = option.qq == null ? "" : option.qq
    let phone = option.phone == null ? "" : option.phone
    return `update userform set name = "${name}", id="${id}", wechat="${wechat}", qq="${qq}", phone="${phone}" where email = "${email}"`
  },
  //头像部分
  postAvatar(option) {
    const avatar = option.avatarUrl
    const email = option.email
    return 'update userform set avatar = "'+avatar+'" where email = "'+email+'"'
  },
  getAvatar(option) {
    return 'select avatar,name from userform where email = \''+option.email+'\''
  }
}

module.exports = information