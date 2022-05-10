<template>
  <div class="process">
    <el-card class="box-card">
      <div class="information">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="学号">
            <el-input v-model="form.id"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <div>{{form.email}}</div>
          </el-form-item>
          <el-form-item label="weChat">
            <el-input v-model="form.wechat"></el-input>
          </el-form-item>
          <el-form-item label="QQ">
            <el-input v-model="form.qq"></el-input>
          </el-form-item>
          <el-form-item label="Phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import http from "@/common/api/request.js";

export default {
  data() {
    return {
      form: {
        name: "",
        id: "",
        email: window.atob(this.$route.query.email),
        wechat: "",
        qq: "",
        phone: ""
      },
    };
  },
  methods: {
    // 保存功能
    async save() {
      let res = await http.$axios({
        url: "/api/information/set",
        method: "POST",
        data: this.form,
      })
      if(res.code === 200) {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      }
    },
    // 获取个人信息功能
    async getInformation() {
      let res = await http.$axios({
        url: "/api/information/get",
        method: "GET",
        params: {
          email: this.form.email
        }
      })
      if(res.code === 200) {
        this.form = res.data[0]
      } else {
        console.log(res.data[0]);
      }
    }
  },
  created() {
    this.getInformation();
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