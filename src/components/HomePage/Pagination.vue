<template>
  <div class="bottom">
    <el-pagination 
      background 
      layout="prev, pager, next" 
      :page-count="total"
      @current-change="getPageCur"
    >
    </el-pagination>
  </div>
</template>

<script>
import http from "@/common/api/request.js";
export default {
  data () {
    return {
      page:1,
      total:0
    }
  },
  methods: {
    getPageCur(page) {
      this.$emit('getPageCur',page)
    },
    async getPageSize() {
      let res = await http.$axios({
        url:'/api/home/pageSize'
      })
      if(res.code === 200) this.total = Math.ceil(res.data/5)
    }
  },
  created() {
    this.getPageSize(this.page)
  }
};
</script>
<style>
.bottom {
  margin-top: 35px;
  text-align: center;
}
</style>
