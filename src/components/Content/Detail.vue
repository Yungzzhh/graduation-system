<template>
  <div>
    <div class="header">
      <el-page-header
        class="back"
        @back="goBack"
        content="详情页面"
      ></el-page-header>
    </div>
    <div class="section">
      <el-card class="box-card" shadow="always">
        <h1 class="title">{{item.title}}</h1>
        <div v-for="item in imgList" :key="item">
          <img :src="item" class="imgSize">
        </div>
        <h3 class="content">{{item.remarks}}</h3>
        <el-button type="info" icon="el-icon-message" round @click="getFile">相关文件</el-button>
        <div class="relevantPersonnel">
          <div>作者：{{item.author}}</div>
          <div>相关导师：{{item.teacher}}</div>
        </div>
        <div>
          <div>文章编号：{{item.titleId}}</div>
        </div>
        <el-button @click="confirm" v-if="identify==='student'">是否选取该题目</el-button>
        <!-- 添加防抖功能 -->
        <!-- 添加确认框功能 -->
      </el-card>
    </div>
  </div>
</template>

<script>
import http from "@/common/api/request.js";
import time from '@/utils/getTime.js'

export default {
  props: {
    item: {
      type:Object,
      default: {name: 'tom'}
    },
    name: {
      type:String,
      default: 'Jerry'
    }
  },
  data () {
    return {
      imgList:[],
      fileUrl:'',
      selectMessage:{},
      identify:this.$route.query.identify
    }
  },
  methods: {
    // 返回菜单
    goBack() {
      this.$emit("goBack");
    },
    // 初始化页面
    getItem() {
      //获取图片路径
      this.imgList = this.item.imgSqlUrl.split("|").slice(0,-1)
      this.fileUrl = 'http://localhost:3000'+this.item.uploadUrl.substring(8)
    },
    //下载文件
    getFile() {
      if(this.item.uploadUrl !==""){
        console.log(this.fileUrl);
        window.open(this.fileUrl, '_blank')
      } else {
        this.$message.error('文件不存在')
      }
    },
    //选择该题目
    confirm() {
      this.$confirm('是否选择该题目?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.checkSelect()
          this.item.selected === "1" 
            ? this.$message({
              type:'error',
              message:'已被选中研究，请选择其他题目'
            }) 
            : this.select()
        }).catch(()=> {
          this.$message({
            type: 'info',
            message: '已取消选择'
          });
        })
    },
    async select() {
      let list = JSON.parse(localStorage.getItem('list'))
      let teacherID = list.find(item => item.email == this.item.teacherEmail)
      this.$io.emit('select',teacherID)
      let res = await http.$axios({
        url: "/api/offline/save",
        method: "POST",
        data: {
          email: window.atob(this.$route.query.email),
          title: this.item.title,
          titleId: this.item.titleId,
          teacherEmail: this.item.teacherEmail,
          time: time.format(new Date(),'yyyy:MM:dd:HH:mm:ss')
        }
      })
      if(res.code === 200) {
        this.$message({
          type: 'success',
          message: '请等待老师审核,请勿重新申请'
        });
      } else {
        this.$message.error('请勿重新申请')
      }
    },
  },
  created() {
    this.getItem()
  }
};
</script>

<style lang="scss" scope>
.header {
  background-color: pink;
  width: 100%;
  height: 64px;
  .back {
    padding: 20px;
  }
}
.section {
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    display: flex;
    width: 1300px;
    background-color: rgb(255, 251, 251);
    .title {
      width: 1300px;
      font-size: 30px;
      text-align: center;
    }
    .picture {
      width: 50%;
      height: 500px;
      margin: 0 auto;
    }
  }
}
.imgSize {
  width: 500px;
  height: 500px;
}
</style>
