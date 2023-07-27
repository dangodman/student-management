<template>
  <div class="ainforlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>学籍管理</el-breadcrumb-item>
      <el-breadcrumb-item>学籍列表</el-breadcrumb-item>
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
      <el-col :span="3" v-if="isshow">
        <div class="grid-content bg-purple">
          <el-button type="primary" @click="addstulist">添加学籍</el-button>
        </div>
      </el-col>
    </el-row>



    <p style="color: #99A9BF; font-size: 14px;">Tips：<span style="color: red;">双击</span>表格的任一行可进入当前单元行的学籍管理页面。</p>
    <el-table 
      :data="stuinforlist.slice((currentPage - 1) * pagesize, currentPage * pagesize)" style="width: 1290px">
      <el-table-column type="index" label="序号" width="70px"></el-table-column>
      <el-table-column prop="name" label="姓名" width="110px"></el-table-column>
      <el-table-column prop="sex" label="性别" width="90px"></el-table-column>
      <el-table-column prop="class" label="入学班级" width="150px"></el-table-column>
      <el-table-column prop="studentno" label="学号" width="130px"></el-table-column>
      <el-table-column prop="enrolmentdate" label="入学日期" width="180px"></el-table-column>
      <el-table-column prop="nativeplace" label="籍贯" width="180px"></el-table-column>
      <el-table-column prop="birthdate" label="出生日期" width="180px"></el-table-column>
      <el-table-column prop="idnumber" label="身份证号" width="200px"></el-table-column>
      <el-table-column label="操作" align="center" width="200px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 设置分页效果-->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[5, 8, 10, 20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"
      :total="stuinforlist.length">
    </el-pagination>

  </div>
</template>

<script>
export default {
  name: 'Ainforlist',
  data() {
    return {
      classes: '',
      stuinforlist: [],
      stuinforlists:[],
      currentPage: 1,
      pagesize: 10,
      isshow: true,
      inforquery: '',
    }
  },
  methods: {
    /* 获取指定班级学生的信息列表 */
    getstuinfor() {
      this.stuinforlist = []
      if (this.classes == '2021815') {
        this.stuinforlists.filter(i => {
          if (i.class === '2021815') {
            return this.stuinforlist.push(i)
          }
        })
      } else if (this.classes == '2021814') {
        this.stuinforlists.filter(i => {
          if (i.class === '2021814') {
            return this.stuinforlist.push(i)
          }
        })
      }
      this.isshow = true;   // 输入框和按钮开关
      this.inforquery = '';   // 查询内容
    },
    /* 搜索功能*/
    gettargrtinfor() {
      this.stuinforlist = [];
      // if (this.classes == '2021813') {
      // this.$http.get('class1').then(res => {
      // res.data.filter(i => {
      // if (i.name.match(this.inforquery) || i.sex.match(this.inforquery) || i.studentno.match(this.inforquery) || i.class.match(this.inforquery) || i.enrolmentdate.match(this.inforquery) || i.nativeplace.match(this.inforquery) || i.birthdate.match(this.inforquery) || i.idnumber.match(this.inforquery)) {
      // return this.stuinforlist.push(i)
      // }
      // })
      // })
      // } else if (this.classes == '2021814') {
      // this.$http.get('classs2').then(res => {
      // res.data.filter(i => {
      // if (i.name.match(this.inforquery) || i.sex.match(this.inforquery) || i.studentno.match(this.inforquery) || i.class.match(this.inforquery) || i.enrolmentdate.match(this.inforquery) || i.nativeplace.match(this.inforquery) || i.birthdate.match(this.inforquery) || i.idnumber.match(this.inforquery)) {
      // return this.stuinforlist.push(i)
      // }
      // })
      // })
      // } else {
      // this.$http.get('stuinforlist').then(res => {
      // res.data.filter(i => {
      // if (i.name.match(this.inforquery) || i.sex.match(this.inforquery) || i.studentno.match(this.inforquery) || i.class.match(this.inforquery) || i.enrolmentdate.match(this.inforquery) || i.nativeplace.match(this.inforquery) || i.birthdate.match(this.inforquery) || i.idnumber.match(this.inforquery)) {
      // return this.stuinforlist.push(i)
      // }
      // })
      // })
      // }
      
        this.stuinforlists.filter(i => {
          if (i.name.match(this.inforquery) || i.sex.match(this.inforquery) || i.studentno.match(this.inforquery) || i.class.match(this.inforquery) || i.enrolmentdate.match(this.inforquery) || i.nativeplace.match(this.inforquery) || i.birthdate.match(this.inforquery) || i.idnumber.match(this.inforquery)) {
             return this.stuinforlist.push(i)
          }
        })
      
    },
    /* 添加新的学籍*/
    addstulist() {
      this.$router.push({ path: '/admin/addstulist'});
    },

    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    // 修改学籍
    handleEdit(index, row) {
      // console.log(index, row);
      this.$router.push({path:'/admin/sedit',query:{id:index}})
    },
    // 删除学籍
    handleDelete(index, row) {
      this.stuinforlist.splice(index,1)
      this.$axios.get("http://127.0.0.1:4000/deleted?stuid=" + row.studentno).then(function(res){
        console.log(index);
        console.log(row.studentno);
      })
      
    },
    // 查询
    queryallstulist(){
      var that = this
      this.$axios.get("http://127.0.0.1:4000/stulist").then(function(res){
        console.log(res);
        console.log(res.data.stulist);
        that.stuinforlists = res.data.stulist
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
