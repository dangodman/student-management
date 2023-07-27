<template>
  <div class="grade-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>学籍管理</el-breadcrumb-item>
      <el-breadcrumb-item>成绩列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-form label-width="40px" ref="resetform">
            <el-form-item label="班级">
              <el-select v-model="classes" placeholder="请选择您要管理的班级" clearable ref="selectbox">
                <el-option label="2021813" value="2021813">2021813</el-option>
                <el-option label="2021814" value="2021814">2021814</el-option>
                <el-option label="2021815" value="2021815">2021815</el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button type="primary" @click="getstuinfor">获取信息</el-button>
        </div>
      </el-col>
      <el-col :span="4" v-if="isshow">
        <div class="grid-content bg-purple">
          <el-input placeholder="请输入关键词进行查询" v-model="inforquery" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="gettargrtinfor"></el-button>
          </el-input>
        </div>
      </el-col>
    </el-row>
    <p style="color: #99A9BF; font-size: 14px;">Tips：<span style="color: red;">双击</span>下方表格为学生成绩单元行</p>
    <el-table @row-dblclick="toinfordetails" :data="sgradlist.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
      style="width: 1290px">
      <el-table-column type="index" label="序号" width="70px"></el-table-column>
      <el-table-column prop="name" label="姓名" width="110px"></el-table-column>
      <el-table-column prop="class" label="班级" width="110px"></el-table-column>
      <el-table-column prop="sex" label="性别" width="90px"></el-table-column>
      <el-table-column prop="stuID" label="学号" width="130px"></el-table-column>
      <el-table-column prop="study" label="学业情况" width="150px"></el-table-column>
      <el-table-column prop="gpa" label="学绩点" width="180px"></el-table-column>
      <el-table-column prop="ITscope" label="智育分数" width="180px"></el-table-column>
      <el-table-column prop="getcredit" label="获得学分" width="180px"></el-table-column>
      <el-table-column prop="retake" label="补考重读情况" width="200px"></el-table-column>
    </el-table>
    <!-- 设置分页效果-->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[5, 8, 10, 20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"
      :total="sgradlist.length">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Sgrade',
  data() {
    return {
      classes: '',
      sgradlist: [],
      sgradlists: [],
      currentPage: 1,
      pagesize: 10,
      isshow: true,
      inforquery: '',
    }
  },
  methods: {
    /* 获取指定班级学生的信息列表 */
    getstuinfor() {
      // if (this.classes == '2021813') {
      // this.$http.get('class1').then(res => {
      // this.stuinforlist = res.data;
      // })
      // } else if (this.classes == '2021814') {
      // this.$http.get('classs2').then(res => {
      // this.stuinforlist = res.data;
      // })
      // } else {
      // this.$http.get('stuinforlist').then(res => {
      // this.stuinforlist = res.data;
      // })
      // }
      this.sgradlist = []
      if (this.classes == '2021815') {
        this.sgradlists.filter(i => {
          if (i.class === '2021815') {
            return this.sgradlist.push(i)
          }
        })
      } else if (this.classes == '2021814') {
        this.sgradlists.filter(i => {
          if (i.class === '2021814') {
            return this.sgradlist.push(i)
          }
        })
      }
      this.isshow = true;   // 输入框和按钮开关
      this.inforquery = '';   // 查询内容
    },
    gettargrtinfor() {
      this.sgradlist = [];
      this.sgradlists.filter(i => {
        if (i.name.match(this.inforquery) || i.sex.match(this.inforquery) || i.studentno.match(this.inforquery) || i.class.match(this.inforquery) || i.enrolmentdate.match(this.inforquery) || i.nativeplace.match(this.inforquery) || i.birthdate.match(this.inforquery) || i.idnumber.match(this.inforquery)) {
          return this.sgradlist.push(i)
        }
      })

    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    toinfordetails(row, event, column) {
      this.$router.push({ path: '/admin/ainfordetails/' + row.id, query: { targetclass: this.classes } })
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    queryallstulist() {
      var that = this
      this.$axios.get("http://127.0.0.1:4000/sgrade").then(function (res) {
        console.log(res);
        console.log(res.data.sgrade);
        that.sgradlists = res.data.sgrade
        console.log(that.sgradlists);
      })
    }
  },
  mounted(){
    this.queryallstulist()
  }

}
</script>

<style scoped="scoped">
.el-row {
  margin: 30px 0 10px 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
}

.row-bg {
  padding: 10px 0;
}

.el-table {
  border-top: 1px solid #EBEEF5;
  margin-bottom: 20px;
}
</style>