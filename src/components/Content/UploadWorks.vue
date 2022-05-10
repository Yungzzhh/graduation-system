<template>
  <div class="process">
    <!-- 上传作品 -->
    <el-card class="box-card">
      <div class="information">
        <el-form ref="form" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="作品题目" prop="title">
            <el-input v-model.trim="form.title"></el-input>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model.trim="form.author"></el-input>
          </el-form-item>
          <el-form-item label="老师" prop="teacher">
            <el-input v-model.trim="form.teacher"></el-input>
          </el-form-item>
          <el-form-item label="老师email">
            <el-input v-model.trim="form.teacherEmail"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="contact">
            <el-input v-model.trim="form.contact"></el-input>
          </el-form-item>
          <el-form-item label="往期论文">
            <el-upload
              class="upload-demo"
              action="uploadUrl"
              :limit="1"
              :http-request="uploadFile"
              ref="upload"
              enctype="multipart/form-data"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="参考图片">
            <el-upload
              ref="picUpload"
              action=""
              list-type="picture-card"
              :file-list="imgUrlList"
              :on-preview="handlePictureCardPreview"
              :http-request="getImg"
              :limit="3"
              :auto-upload="false"
              multiple
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <div v-for="item in imgUrlList" :key="item.id">
                <img width="100%" :src="item" alt="">
              </div>
            </el-dialog>
            <el-button size="small" type="primary" @click="picUpload">上传</el-button>
          </el-form-item>
          <el-form-item label="编号">
            <div>{{form.id}}</div>
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model.trim="form.remarks"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="checkEmail">提交</el-button>
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
        title: "",
        author: "",
        teacher: "",
        teacherEmail: this.$route.query.identify === 'teacher' ? window.atob(this.$route.query.email) : "",
        contact: "",
        remarks: "",
        id:''
      },
      rules: {
        title: [
          {required: true, message:'请输入题目', trigger: 'blur'}
        ],
        author: [
          {required: true, message:'请输入作者名称', trigger: 'blur'}
        ],
        teacher: [
          {required: true, message:'请输入老师名称', trigger: 'blur'}
        ],
        contact: [
          {required: true, message:'请输入老师名称', trigger: 'blur'}
        ],
        remarks: [
          {required: true, message:'请输入老师名称', trigger: 'blur'}
        ],
      },
      uploadUrl: "",
      imgUrlList: [],
      dialogImageUrl: [],
      dialogVisible: false,
    };
  },
  methods: {
    // 文件上传
    uploadFile(params) {
      const formdata = new window.FormData();
      const file = params.file;
      formdata.append("file", file);
      http.$axios({
        url: "/api/upload/uploadFile",
        method: "POST",
        data: formdata,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then((result) => {
        this.uploadUrl = JSON.stringify(result.data.url)
      }).catch((err) => {
        console.log(err);
      });
    },
    // 文件+图片+信息上传 ---确认按钮
    async uploadTitle() {
      let imgSqlUrl = ""
      for(let i=0;i<this.imgUrlList.length;i++) {
        imgSqlUrl = imgSqlUrl+this.imgUrlList[i].url+'|'
      }
      console.log(imgSqlUrl);
      let params = {
        ...this.form,
        uploadUrl: this.uploadUrl,
        imgSqlUrl: imgSqlUrl,
        identify: this.$route.query.identify
      }
      this.$refs['form'].validate(async (valid)=> {
        if(valid && this.uploadUrl !== '' && imgSqlUrl!=="") {
          let res = await http.$axios({
            url:'/api/upload/uploadTitle',
            method:'POST',
            data: params
          })
          if(res.code === 200) {
            this.$message({
              message: '毕业设计'+res.message,
              type: 'success'
            })
            this.getMaxId()
            this.imgUrlList = []
            this.uploadUrl = ''
          } else {
            this.$message.error(res.err)
          }
        } else if(this.uploadUrl === '') {
          this.$message.error('请上传文件')
        } else if(imgSqlUrl === '') {
          this.$message.error('请上传相关图片')
        } else {
          this.$message.error('请检查资料是否填写完整')
        }
      })
    },
    // 检查teacherEmail是否存在
    async checkEmail() {
      let res = await http.$axios({
        url: '/api/upload/checkEmail',
        params: {
          email: this.form.teacherEmail
        }
      })
      if(res.code === 200 && res.data !== undefined && res.data.identify === 'false') {
        this.uploadTitle()
        this.notice()
      } else {
        this.$message.error('请输入正确的老师的邮箱')
      }
    },
    async notice() {
      let res = await http.$axios({
        url:"/api/upload/notice",
        method:"POST",
        data:{
          email: this.form.teacherEmail
        }
      })
    },
    // id获取
    async getMaxId() {
      let res = await http.$axios({
        url:'/api/upload/maxid',
        method:'GET'
      })
      console.log(res);
      if(res.code === 200) this.form.id = res.data+1
    },
    // 多图片上传
    getImg(params) {
      this.imgUrlList.push(params.file)
    },
    // 多图片上传
    async picUpload() {  
        this.$refs.picUpload.submit()
        let formData = new FormData();
        this.imgUrlList.forEach(function (file) {
          formData.append('file', file); // 因为要上传多个文件，所以需要遍历一下才行
          //不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
        })
        if(this.imgUrlList.length !== 0) {
          let res = await http.$axios({
            url:"/api/upload/imgsUpload",
            method:"POST",
            data: formData
          })
          console.log(res);
          if(res.code === 200) {
            this.imgUrlList = res.list.map(item => {
              return {
                url: item.url,
                id: item.id
              }
            })
            this.$message({
              message: '上传成功',
              type: 'success'
            })
          }
        } else {
          this.$message.error('上传为空')
        }
        
    },
    // 多图片上传
    handlePictureCardPreview(file) {
      this.dialogImageUrl = this.imgUrlList
      this.dialogVisible = true;
    },
  },
  created() {
    this.getMaxId()
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
