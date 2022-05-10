<template>
  <div class="nav">
    <div class="avator">
      <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :http-request="uploadAvator"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
          <img
            v-if="avatorUrl"
            :src="avatorUrl"
            style="width:80px;height:80px;"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <h1>欢迎 {{ name }} 来到毕业设计管理系统，请尽情浏览您感兴趣的内容</h1>
    <el-button
      @click="back"
      class="quit"
      icon="el-icon-switch-button"
      circle
      size="mini"
    ></el-button>
  </div>
</template>

<script>
import http from "@/common/api/request.js";
export default {
  data() {
    return {
      name:'John Wick',
      // 头像路径
      avatorUrl:""
    };
  },
  methods: {
    // 退出登录
    async back() {
      this.$io.emit('exit')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      let res = await http.$axios({
        url:'/api/loginPage/loginOut',
        method: "POST",
        data: {
          email: sessionStorage.getItem('email')
        }
      })
    },
    // 头像获取
    async getAvatar() {
      const res = await http.$axios({
        url:'/api/avatar/getAvator',
        params: {
          email: window.atob(this.$route.query.email)
        }
      })
      if(res.code === 200) {
        this.avatorUrl = res.data[0].avatar
        this.name = res.data[0].name
      } else {
        console.log(temp.data);
      }
    },
    // 头像上传
    async uploadAvator(params) {
      console.log(1);
      const formdata = new FormData()
      const file = params.file
      formdata.append("file", file)
      //存储图片路径
      let res = await http.$axios({
        url:"/api/avatar/getAvatarUrl",
        method:"POST",
        data: formdata,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      if(res.code === 200) {
        this.avatorUrl = res.data
        this.saveAvatarUrl(this.avatorUrl)
      }
    },
    async saveAvatarUrl(picUrl) {
      // console.log(picUrl);
      let res = http.$axios({
        url:"/api/avatar/postAvatar",
        method:"POST",
        data: {
          email:window.atob(this.$route.query.email),
          avatarUrl: picUrl
        }
      })
      if(res.code === 200) {
        this.getAvatar()
      } else {
        console.log(res.data);
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  },
  created() {
    this.getAvatar()
  }
};
</script>

<style lang="scss" scoped>
.nav {
  height: 80px;
  display: flex;
  justify-content: space-between;
  margin: 5px;
  .avator {
    width: 80px;
    height: 80px;
  }
  .quit {
    width: 80px;
  }
}
</style>
