<template>
  <div class="content">
    <header>
      <section>
        <div class="logo"><i class="el-icon-menu">论文题目查询</i></div>
        <div class="searchInput">
          <el-input
            placeholder="请输入要搜索的内容"
            prefix-icon="el-icon-search"
            v-model="searchInput"
            @keyup.enter.native="search"
          >
          </el-input>
        </div>
      </section>
    </header>
    <section>
      <div class="card" v-if="!showDetail">
        <el-card class="box-card" shadow="always">
          <div v-for="item in list" :key="item.id" class="text item" @click="detail(item)">
            <!-- {{'列表内容 ' + o }} -->
              <div>
                <div style="margin-left:15px">题目：{{item.title}}</div>
                <div style="margin:10px 15px">指导老师：{{item.teacher}}</div>
                <div style="margin:10px 15px">参与学生：{{item.author}}</div>
                <div style="margin-left:15px">作品ID：{{item.titleId}}</div>
              </div>
              <div style="margin:20px 20px 0 0;" v-show="item.selected === '1'">
                <el-button type="warning" disabled>已被选中</el-button>
              </div>
          </div>
          <Pagination v-if="pagination"  @getPageCur="getPageCur"></Pagination>
        </el-card>
      </div>
    </section>
  </div>
</template>
<script>
import Detail from './Detail.vue'
import Pagination from '../HomePage/Pagination.vue';
import http from "@/common/api/request.js";

export default {
  data() {
    return {
      searchInput:'',
      list:[],
      showDetail:false,
      page:1,
      pagination: true
    }
  },
  components: {
    Detail,
    Pagination
  },
  methods: {
    // 搜索框点击功能 要节流
    async search() {
      // console.log(this.searchInput);
      if(this.searchInput !== '') {
        // 发送请求，搜索数据库
        let res = await http.$axios({
          url:'/api/home/search',
          params: {
            val: this.searchInput
          }
        })
        res.code === 200 ? this.list = res.data : this.list = []
        this.pagination = false
      } else {
        this.page = 1
        this.getList()
        this.pagination = true
      }
    },
    // 进入项目详情功能
    detail(index) {
      this.$emit('toDetail', index)
    },
    async getList() {
      let res = await http.$axios({
        url: '/api/home/getList',
        params: {
          page:this.page
        }
      })
      if(res.code === 200) {
        this.list = res.data
        console.log(this.list);
      }
    },
    getPageCur(page) {
      this.page = page
      this.getList()
    }
  },
  created() {
    this.getList()
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: auto;
}
header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  section {
    width: 100%;
    height: 100px;
    background-color: pink;
    display: flex;
    align-items: center;
    justify-content: center;
    .logo {
      padding-right: 5px;
    }
    .searchInput {
      width: 400px;
    }
  }
}
section {
  display: flex;
  justify-content:center;
  align-items: center;
}
.item {
  padding: 18px 0;
}
.box-card {
  width: 1300px;
  margin-top: 5px;
  background-color: rgb(255, 251, 251);
}
.text {
  font-size: 14px;
  height: 130px;
  margin-left: 10px;
  margin-bottom: 5px;
  background-color: antiquewhite;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
}
</style>