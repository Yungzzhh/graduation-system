function insertPublishList(options) {
  let email = options.email
  let titleId = options.titleId
  let teacherEmail = options.teacherEmail
  let time = options.time
  return `insert into publish_list (email, teacherEmail, titleId, time, process,teacher,title) values ("${email}","${teacherEmail}",${titleId},"${time}",1,"${options.teacher}","${options.title}")`
}

function removeTempList(options) {
  let id = options.id
  return `delete from temp_list where titleId = "${id}"`
}

function getPublish(options) {
  return `select * from publish_list where email = "${options.email}"`
}

module.exports = {
  removeTempList,
  insertPublishList,
  getPublish
}