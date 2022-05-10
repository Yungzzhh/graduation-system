import {
  GET_LIST,
  CHANGE_LIST
} from './mutations-types'
import http from "@/common/api/request.js";


export default {
  state: {
    list: [{
      name:'xxxx'
    }],

    info: {},
    avatarUrl: ""
  },
  mutations:{
    [CHANGE_LIST](state) {
      state.list.push({
        data: {
          name: 'yung'
        }
      })
    }
  }
  // actions: {
  //   getAvatatUrl({commit,state}) {
  //     const email = JSON.parse(localStorage.getItem("email"))
  //     http.$axios({
  //       url: "",
  //       params: {
  //         email: email
  //       }
  //     }).then(res => {
  //       commit('setAvatarUrl')
  //     })
  //   }
  // }
}