// 文件上传
const TitleList = {
  titleInsert(option) {
    let title = option.title
    let author = option.author
    let teacher = option.teacher
    let teacherEmail = option.teacherEmail
    let contact = option.contact
    let remarks = option.remarks
    let uploadUrl = option.uploadUrl == '' ? '""':option.uploadUrl
    let imgSqlUrl = option.imgSqlUrl == '' ? '""':option.imgSqlUrl
    let id = option.id
    if(option.identify === 'teacher') {
      return `insert into title_list (title,author,teacher,teacherEmail,contact,remarks,uploadUrl,titleId,imgSqlUrl,allowed) values ("${title}","${author}","${teacher}","${teacherEmail}","${contact}","${remarks}",${uploadUrl},${id},"${imgSqlUrl}","1")`
    }
    return `insert into title_list (title,author,teacher,teacherEmail,contact,remarks,uploadUrl,titleId,imgSqlUrl) values ("${title}","${author}","${teacher}","${teacherEmail}","${contact}","${remarks}",${uploadUrl},${id},"${imgSqlUrl}")`
  },
  maxid() {
    return 'select max(titleId) from title_list'
  },
  getList(page) {
    return `select * from  title_list limit ${(page-1)*5},5`
  },
  getListSize() {
    return `select * from  title_list`
  },
  search(val) {
    return `select * from  title_list where title like'%${val}%'` 
  }
}
module.exports = TitleList