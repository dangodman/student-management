<template>
  <div class="course-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>学籍管理</el-breadcrumb-item>
      <el-breadcrumb-item>课程列表</el-breadcrumb-item>
    </el-breadcrumb>
    <p style="color: #99A9BF; font-size: 14px;">Tips：<span style="color: red;">下方</span>表格为课程单元行</p>
    <el-table :data="courselist.slice((currentPage - 1) * pagesize, currentPage * pagesize)" style="width: 800px">
      <el-table-column type="index" label="序号" width="70px"></el-table-column>
      <el-table-column prop="courseName" label="课程名" width="120px"></el-table-column>
      <el-table-column prop="courseType" label="课程类型" width="120px"></el-table-column>
      <el-table-column prop="courseNature" label="课程性质" width="120px"></el-table-column>
      <el-table-column prop="courseCredit" label="课程学分" width="120px"></el-table-column>
      <el-table-column prop="teacher" label="任课教师" width="120px"></el-table-column>
      <el-table-column prop="courseRoom" label="任课教室" width="120px"></el-table-column>

    </el-table>
    <!-- 设置分页效果 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[5, 8, 10, 20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"
      :total="courselist.length">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Course',
  data() {
    return {
      courselist: [],
      currentPage: 1,
      pagesize: 10,
    }
  },
  methods: {
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    querycourselist() {
      var that = this
      this.$axios.get("http://127.0.0.1:4000/course").then(function (res) {
        console.log(res);
        console.log(res.data.course);
        that.courselist = res.data.course
      })
    }
  },
  mounted(){
    this.querycourselist()
  }
  }
</script>

<style></style>