<template>
  <div class="sedit-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>学籍管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改学生学籍信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin: 20px;"></div>
    <el-form label-width="110px" ref="resetform" :model="informations" :rules="rulesform">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="informations.name" placeholder="请输入您的姓名"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="informations.sex" placeholder="请选择您的性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="学号" prop="studentno">
              <el-input v-model="informations.studentno" placeholder="请输入学生学号"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="入学班级" prop="class">
              <el-input v-model="informations.class" placeholder="请输入学生的班级"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-form-item label="入学日期" prop="enrolmentdate" style="width:1000px">
        <el-input v-model="informations.enrolmentdate" placeholder="请输入入学日期"></el-input>
      </el-form-item>
      <el-form-item label="籍贯" prop="nativeplace" style="width:1000px">
        <el-input v-model="informations.nativeplace" placeholder="请学生的籍贯: XX省XX市(县)"></el-input>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthdate" style="width:1000px">
        <el-input v-model="informations.birthdate" placeholder="请学生的出生日期"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idnumber" style="width:1000px">
        <el-input v-model="informations.idnumber" placeholder="请输入学生的身份证号码" maxlength="18" show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submitbtn">提交</el-button>
    <el-button type="danger" @click="resetbutton">重置</el-button>
    <el-button @click="goback">返回</el-button>
  </div>
</template>

<script>
export default {
  name: "Sedit",
  data() {
    return {
      informations: {},
      information: [],
      formChange: false,
      formChangeNum: 0,
      // 表单验证规则
      rulesform: {
        name: [
          { required: true, message: '请输入您的姓名', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择您的性别', trigger: 'blur' },
        ],
        studentno: [
          { required: true, message: '请输入您的学号', trigger: 'blur' },
          { min: 4, max: 4, message: '长度为4个字符', trigger: 'blur' }
        ],
        class: [
          { required: true, message: '请输入您的班级', trigger: 'blur' }
        ],
        nativeplace: [
          { required: true, message: '请输入您的籍贯', trigger: 'blur' }
        ],
        idnumber: [
          { required: true, message: '请输入您的身份证号码', trigger: 'blur' },
          { min: 18, max: 18, message: '长度为18个字符', trigger: 'blur' }
        ],
        birthdate: [
          { required: true, message: '请选择您的出生日期', trigger: 'blur' }
        ],
        enrolmentdate: [
          { required: true, message: '请选择您的入学日期', trigger: 'blur' }
        ],
      }
    }
  },
  /* watch用于侦听数据是否发生变化*/
  watch: {
    informations: {
      handler() {
        this.formChangeNum++;
        if (this.formChangeNum >= 2) {
          this.formChange = true;
        } else {
          this.formChange = false;
        }
      },
      deep: true
    }
  },
  methods: {
    /* 向本地数据接口发送数据请求*/
    getInformations() {
      var that = this
      this.$axios.get("http://127.0.0.1:4000/stulist").then(res => {
        console.log(res.data.stulist)
        console.log(that.$route.query.id);
        this.informations = res.data.stulist[that.$route.query.id]
      })
      // this.$http.get('students').then(res => {
      // this.informations = res.data[0]
      // })

      // 获得编辑单元编号
      // console.log(this.$route.query.id);
    },
    /* 提交功能*/
    submitbtn() {
      this.$refs.resetform.validate((valid) => {
        if (valid) {
          let newInformations = {
            name: this.informations.name,
            sex: this.informations.sex,
            class: this.informations.class,
            studentno: this.informations.studentno,
            enrolmentdate: this.informations.enrolmentdate,
            nativeplace: this.informations.nativeplace,
            birthdate: this.informations.birthdate,
            idnumber: this.informations.idnumber,
          }
          if (this.formChange) {
            this.$confirm('是否要提交表单？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '您的信息已经更新成功。'
              });
              this.$axios.post('http://127.0.0.1:4000/updatelist', newInformations).then(res => {
                this.$router.push('/admin/astulist');
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消当前操作。'
              });
            });
          } else {
            this.$message.info('您当前并未修改信息，已为您停留在当前页面。')
          }
        } else {
          return false;
        }
      });
    },
    /* 重置表单功能*/
    resetbutton() {
      this.$confirm('是否要重置表单？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '重置完毕。'
        });
        this.$refs.resetform.resetFields()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消当前操作。'
        });
      });
    },
    /* 返回功能*/
    goback() {
      this.informations = []
      if (this.formChange) {
        this.$confirm('是否要保存您修改的数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '已经为您保存数据。',
          });
          this.$router.push('/admin/astulist')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '当前数据并没有保存。'
          });
          this.$router.push('/admin/astulist')
        });
      } else {
        this.$router.push('/admin/astulist')
      }
    },
  },
  created() {
    this.getInformations()
  },
}
</script>

<style scoped="scoped">
.edit-container {
  width: 600px;
}

.el-breadcrumb {
  margin-bottom: 20px;
}

.el-row :last-child {
  margin-bottom: 5px;
}

.el-col {
  border-radius: 4px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.bg-tags {
  background-color: #36A4F0;
  color: #FFFFFF;
}
</style>