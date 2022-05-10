<template>
  <div class="home">
    <!-- <el-button @click="test">test</el-button> -->
    <aside class="sidebar">
      <SideBar @getName="getName"></SideBar>
    </aside>
    <div class="content">
      <Nav></Nav>
      <component 
        :is="currentComponent" 
        @toDetail='toDetail' 
        @goBack="goBack" 
        :item="item" 
      ></component>
    </div>
    <!-- <el-button @click="getSession">1</el-button> -->
  </div>
</template>
<script>
// 组件
import SideBar from "../components/Content/SideBar";
import Nav from "../components/Content/Nav.vue"
import Index from "../components/Content/Index.vue";
import MyStudent from "../components/Content/MyStudent.vue";
import PersonalInfomation from "../components/Content/PersonalInfomation.vue";
import ProcessQuery from "../components/Content/ProcessQuery.vue";
// import UploadTitle from "../components/Content/UploadTitle.vue";
import UploadWorks from "../components/Content/UploadWorks.vue";
import Detail from "../components/Content/Detail.vue"
import Message from '../components/Message/Message.vue';
// 网路
import http from "@/common/api/request.js";

import {mapState, mapMutations} from 'vuex'

export default {
  components: {
    SideBar,
    Nav,
    Index,
    MyStudent,
    PersonalInfomation,
    ProcessQuery,
    // UploadTitle,
    UploadWorks,
    Detail,
    Message
  },
  data() {
    return {
      name:'John Wick',
      currentComponent: "Index",
      item:{},
      massage: '',
    };
  },
  computed: {
    ...mapState({list:state=> state.login.list})
  },
  methods: {
    ...mapMutations(['changeList']),
    getName(name) {
      this.currentComponent = name;
    },
    toDetail(index) {
      this.item = index
      this.currentComponent = Detail
    },
    goBack() {
      this.currentComponent = Index
    },
    sockInit() {
      this.$io.emit('login',window.atob(this.$route.query.email))
      this.$io.on('saveId',data=>{
        console.log(data);
        localStorage.setItem('list',JSON.stringify(data))
      })
      this.$io.on('changeList',data=> {
        localStorage.setItem('list',JSON.stringify(data))
      })
    }
  },
  created() {
  },
  mounted() {
    this.sockInit()
    this.$io.on('test',data=>{
      this.$message({
        type:'success',
        message: '收到消息，请查看'
      })
    })
  }
};
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  width: 100%;
  height: auto;
  min-height: 100%;
  overflow: hidden;
  .content {
    flex:1;
    display: flex;
    flex-direction: column;
    .nav {
      height: 80px;
      display: flex;
      justify-content: space-between;
      margin: 5px;
      .avator {
        width: 80px;
      }
      .quit {
        width: 80px;
      }
    }
  }
}
</style>
