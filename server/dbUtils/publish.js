function getPublishList(email) {
  return `select * from publish_list where email = "${email}"`
}

module.exports = {
  getPublishList
}