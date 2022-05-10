const users = []

function userJoin(id, email) {
  const user = {id, email}
  users.push(user)
  console.log(users);
  return {
    user,
    users
  }
}

function getCurrentUser(id) {
  return users.find(user => user.id === id)
}

function userLeave(id) {
  const index = users.findIndex(user => user.id === id)
  if(index !== -1) {
    return users.splice(index, 1)
  }
  return users
}

// function getRoomUsers(room) {
//   return users.filter(user => user.room === room)
// }

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  // getRoomUsers
}