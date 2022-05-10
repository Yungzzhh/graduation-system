function offLineSave(params) {
  const email =  params.email
  const teacherEmail =  params.teacherEmail
  const id =  params.id
  const time =  params.time
  return `insert into publish_list (email, teacherEmail, titleId, time,title) values ("${email}","${teacherEmail}",${id},"${time}","${params.title}")`
}

// 查询学生的消息 缓存列表
function getTempList(params) {
  // return `select title_list.teacher, title_list.title, title_list.contact, temp_list.time, temp_list.titleId from title_list,temp_list where title_list.titleId = temp_list.titleId and temp_list.email = "${params.email}"`
  return `select * from temp_list,title_list where email = "${params.email}"`
}
function getInfo(params) {
  return `select * from temp_list,title_list where temp_list.titleId = "${params}" and title_list.titleId = "${params}"`
}
// 查询老师的消息 缓存列表
function getTempListTeacher(params) {
  return `select * from temp_list where teacherEmail = "${params.email}"`
}

function selected(params) {
  return `select * from temp_list where email = "${params.email}"`
}

module.exports = {
  offLineSave,
  getTempList,
  getTempListTeacher,
  selected,
  getInfo
}