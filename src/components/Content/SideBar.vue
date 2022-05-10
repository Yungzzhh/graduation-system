<template>
  <div class="sideNav">
    <div class="left">
      <div class="title">毕业设计管理系统</div>
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        background-color='#304156'
        text-color='#8FB1D9'
      >
        <template 
          v-for="item in menuData"
        >
          <el-menu-item :key="item.id" @click="choseModule(item.name)">
            <span slot="title" >{{item.title}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import http from "@/common/api/request.js";
export default {
  data() {
    return {
      /**
       * 在登录的时候输入的是账号和密码，在后端校验之后返回对应的列表
       * 并存储在本地，在加载主页的时候进行显示，避免了通过修改路由
       * 而导致的列表渲染错误
       */
      isCollapse: false,
      menuData:[],
      stuList: [{
        title:'首页',
        name:'Index',
        id:0,
      }, {
        title:'上传作品',
        name:'UploadWorks',
        id:1,
      }, {
        title:'进度查询',
        name:'ProcessQuery',
        id:2,
      }, {
        title:'个人信息',
        name:'PersonalInfomation',
        id:3,
      }],
      teaList: [{
        title:'首页',
        name:'Index',
        id:0
      }, {
        title:'上传题目',
        name:'UploadTitle',
        id:1,
      }, {
        title:'我的学生',
        name:'MyStudent',
        id:2,
      }, {
        title:'个人信息',
        name:'PersonalInfomation',
        id:3,
      }]
    };
  },
  created() {
    this.getIdentify()
  },
  methods: {
    choseModule(name) {
      this.$emit('getName',name)
    },
    //不同权限渲染不同列表
    async getIdentify() {
      let email = window.atob(this.$route.query.email)
      let res = await http.$axios({
        url:'/api/loginPage/getSideBar',
        params: {
          email:email
        }
      })
      if(res) {
        this.menuData = res.data.list
      }
      // this.menuData = list
    }
  }
};
</script>

<style lang="scss" scope>
.sideNav {
  display: flex;
  margin-bottom: -17px;
  height: 100%;
  .left {
    height: 100%;
    .title {
      background-color: #435264;
      width: 199px;
      height: 80px;
      color:white;
      text-align: center;
      line-height: 80px;
      font-size: 20px;
    }
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100%;
    
}
</style>
