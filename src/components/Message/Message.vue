<template>
  <div class="content">
      <div class="card">
        <el-card class="box-card" shadow="always">
          <div class="pend" v-if="pend && identify =='student'">
            <div v-for="item in newList" :key="item.id" class="text item">
              <div class="itemClass">
                <div style="margin-left:15px">作品：{{item.title}}</div>
                <div style="margin-left:15px;margin-top:10px;">作品ID：{{item.titleId}}</div>
                <div style="margin-left:15px;margin-top:10px;">老师：{{item.teacher}}</div> 
                <div style="margin-left:15px;margin-top:10px;">老师Email：{{item.teacherEmail}}</div> 
                <div style="margin-left:15px;margin-top:10px;">时间：{{item.time}}</div> 
              </div>
              <div class="btn">
                <el-card shadow="hover">审核中</el-card>
              </div>          
            </div>
          </div>
          <div class="pend" v-if="pend && identify =='teacher'">
            <div v-for="item in newList" :key="item.id" class="text item">
              <div class="itemClass">
                <div style="margin-left:15px">作品：{{item.title}}</div>
                <div style="margin-left:15px;margin-top:10px;">作品ID：{{item.titleId}}</div>
                <div style="margin-left:15px;margin-top:10px;">学生：{{item.name}}</div> 
                <div style="margin-left:15px;margin-top:10px;">学生Email：{{item.email}}</div> 
                <div style="margin-left:15px;margin-top:10px;">时间：{{item.time}}</div> 
              </div>
              <div class="btn">
                <el-button type="success" @click="confirm(item)">Accept</el-button>
              </div>          
            </div>
          </div>
          <div v-if="!pend">暂时还未有消息</div>
        </el-card>
      </div>
  </div>
</template>

<script>
import http from "@/common/api/request.js";
import time from '@/utils/getTime.js'

export default {
  data() {
    return {
      newList:[],
      identify: this.$route.query.identify,
      email: window.atob(this.$route.query.email),
      pend: false
    }
  },
  methods: {
    confirm(params) {
      this.$confirm('是否选择该题目?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.accept(params)
        }).catch(()=> {
          this.$message({
            type: 'info',
            message: '已取消选择'
          });
        })
    },
    async accept(params) {
      let res = await http.$axios({
        url:'/api/offline/accept',
        method: "POST",
        data: {
          email: params.email, //学生email
          title: params.title,
          titleId: params.titleId,
          teacherEmail: params.teacherEmail,
          time: time.format(new Date(),'yyyy:MM:dd:HH:mm:ss'),
        }
      })
      if(res.code === 200) {
        this.$message({
          type: 'success',
          message: '更改并通知成功'
        })
        this.init()
      }
    },
    async init() {
      let res = await http.$axios({
        url:"/api/offline/get",
        params: {
          email: this.email,
          identify: this.identify,
        }
      })
      if(res.code === 404) {
        this.pend = false
      } else if(res.code === 200 ||res.code === 201) {
        this.pend = true
        this.newList = res.data
      }
      // if(res.code === 200 && res.data.length !== 0) {
      //   this.newList = res.data
      //   this.pend = true
      // } else if(res.code === 201 && res.data.length !== 0) {
      //         console.log(res);
      //   this.newList = res.data.map(item => {
      //     return {
      //       teacher: item.teacher,
      //       title:item.title,
      //       contact:item.phone,
      //       time: item.time,
      //       titleId: item.titleId,
      //       email:item.email,
      //       teacherEmail: item.teacherEmail
      //     }
      //   })
      //   console.log(this.newList);
      //   this.pend = true
      // } else {
      //   this.pend = false 
      // }
    }
  },
  created() {
    this.init()
  }
}
</script>

<style scoped>
.content {
  width: auto;
  display: flex;
  align-items: center;
  margin-top: 20px;
  /* justify-content: center; */
}
.box-card {
  width: 1300px;
  background-color: rgb(255, 251, 251);
}
.text {
  display: flex;
  justify-content:space-between;
  font-size: 14px;
  height: 150px;
  margin-left: 10px;
  margin-bottom: 5px;
  background-color: antiquewhite;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.item {
  padding: 18px 0;
}
.text1 {
  display: flex;
  justify-content:space-between;
  font-size: 14px;
  height: 125px;
  margin-left: 10px;
  margin-bottom: 5px;
  background-color: antiquewhite;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.btn {
  margin-top: 15px;
  margin-right: 25px;
}
.itemClass {
  display: flex;
  flex-direction: column;
}
</style>