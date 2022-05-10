<template>
  <div class="process">
    <el-card class="box-card" >
      <div class="chosen" v-if="list">
        <div>我的选题：{{message.title}}</div>
        <div>选题ID：{{message.titleId}}</div>
        <el-steps :active="active" finish-status="success">
          <el-step title="选取题目"></el-step>
          <el-step title="开题报告"></el-step>
          <el-step title="作品完成"></el-step>
          <el-step title="论文初稿"></el-step>
          <el-step title="论文二稿"></el-step>
          <el-step title="查重"></el-step>
          <el-step title="发表"></el-step>
          <el-step title="答辩结束"></el-step>
        </el-steps>
        <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
      </div>
      <div v-if="chosen">请选择自己的毕业设计题目</div>
      <div v-if="pending">审核中，请稍等</div>
    </el-card>
    
  </div>
</template>

<script>
import http from "@/common/api/request.js";

export default {
  data() {
    return {
      active: 0,
      message: {},
      list: false,
      chosen: false,
      pending: false
    };
  },
  methods: {
    next() {
      if(this.active <= 7) {
        this.$confirm("您的进度将会通知您的导师","确认信息",{
          confirmButtonText: "确认",
          cancelButtonText: "放弃"
        }
      ).then(() => {
        console.log(1);
        this.notice()
      })
       .catch(action => {
         console.log(2);
          this.$message({
            type: "info",
            message:
              action === "cancel" ? "放弃保存并离开页面" : "停留在当前页面"
          });
        });
      } else {
        this.$notify({
          title: '',
          message: '恭喜你完成了你的毕业答辩',
          type: 'success'
        });
      }
    },
    async getList() {
      let res = await http.$axios({
        url: "/api/process/get",
        params: {
          email: sessionStorage.getItem('email'),
          identify: this.$route.query.identify,
        }
      })
      
      if(res.code === 200) {
        this.active = res.data[0].process
        this.message = res.data[0]
        this.list = true
      } else if(res.code === 100) {
        this.pending = true
      } else if (res.code === 404) {
        this.chosen = true
      } 
    },
    async notice() {
      let res = await http.$axios({
        url:"/api/process/updateProcess",
        method:"POST",
        data: {
          email: sessionStorage.getItem('email'),
          active: this.active
        }
      })
      
      if(res.code == 200){
        this.$message({
          type: "success",
          message:"通知成功"
        });
        this.getList()
      }
    }
  },
  created() {
    this.getList()
  }
};
</script>

<style scoped>
.process {
  display: flex;
  align-items: center;
  justify-content: center;
}
.box-card {
  width: 1300px;
  background-color: rgb(255, 251, 251);
}
</style>
