<template>
  <div class="process">
    <el-card class="box-card">
      <div
        v-for="item in list"
        :key="item.id"
        class="text item"
      >
        <div style="margin-left:15px">题目：{{ item.title }}</div>
        <div style="margin:10px 15px">题目ID：{{ item.titleId }}</div>
        <div style="margin:10px 15px">姓名：{{ item.name }}</div>
        <div style="margin:10px 15px">学生邮箱：{{ item.email }}</div>
        <el-steps :active="item.active" finish-status="success">
          <el-step title="选取题目"></el-step>
          <el-step title="开题报告"></el-step>
          <el-step title="作品完成"></el-step>
          <el-step title="论文初稿"></el-step>
          <el-step title="论文二稿"></el-step>
          <el-step title="查重"></el-step>
          <el-step title="发表"></el-step>
          <el-step title="答辩结束"></el-step>
        </el-steps>
      </div>
      <div v-if="haveList">暂时未有学生订阅课题</div>
    </el-card>
    
  </div>
</template>

<script>
import http from "@/common/api/request.js";

export default {
  data() {
    return {
      haveList:false,
      list: [],
    };
  },
  methods: {
    async getList() {
      let res = await http.$axios({
        url: "/api/process/get",
        params: {
          email: sessionStorage.getItem('email'),
          identify: this.$route.query.identify,
        }
      })
      console.log(res);
      if(res.code === 404) {
        this.list = []
        this.haveList = true
      } else {
        this.list = res.data.map(item => {
        return {
          name: item.name,
          title: item.title,
          titleId: item.titleId,
          email: item.email,
          active: item.process
        }
      })
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
.text{
  margin-bottom: 50px;
}
</style>
