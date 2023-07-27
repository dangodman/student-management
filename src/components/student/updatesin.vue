<template>
  <div class="sinformation">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>学籍管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改个人学籍信息</el-breadcrumb-item>
    </el-breadcrumb>

    <div style="margin: 20px;"></div>
    <el-form label-width="110px" ref="resetform" :model="informations">
      <el-row :gutter="20" style="margin-bottom: 20px;">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="informations.name" placeholder="请选择您的姓名"></el-input>
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
      <el-row :gutter="20" style="margin-bottom: 20px;">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="学号" prop="studentno">
              <el-input v-model="informations.studentno" placeholder="请输入您的学号"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="班级" prop="class">
              <el-input v-model="informations.class" placeholder="请输入您的班级"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-form-item label="民族" prop="nation">
        <el-input v-model="informations.nation" placeholder="请输入您的民族"></el-input>
      </el-form-item>
      <el-form-item label="籍贯" prop="nativeplace">
        <el-input v-model="informations.nativeplace" placeholder="请输入您的籍贯: XX省XX市(县)"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idnumber">
        <el-input v-model="informations.idnumber" placeholder="请输入您的身份证号码" maxlength="18" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthdate">
        <el-col :span="10">
          <el-date-picker type="date" placeholder="请选择您的出生日期" v-model="informations.birthdate"
            style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="政治面貌" prop="politicsstatus">
        <el-input v-model="informations.politicsstatus" placeholder="请输入您的政治面貌"></el-input>
      </el-form-item>
      <el-form-item label="兴趣特长" prop="speciality">
        <el-input v-model="informations.speciality" placeholder="请输入您的兴趣特长"></el-input>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="submitbtn">提交</el-button>
    <el-button @click="goback">返回</el-button>
  </div>
</template>

<script>
export default {
  name: 'Sinformation',
  data() {
    return {
      informations: {},
      isdisabled: true,
      formChange: false,
      formChangeNum: 0,
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
    getinformation() {
      this.$axios.get('http://127.0.0.1:4000/sinformation').then(res => {
        this.informations = res.data.sinformation[0]
      })
    },
    /* 提交功能*/
    submitbtn() {
      this.$refs.resetform.validate((valid) => {
        if (valid) {
          let newInformations = {
            name: this.informations.name,
            sex: this.informations.sex,
            studentno: this.informations.studentno,
            class: this.informations.class,
            nation: this.informations.nation,
            nativeplace: this.informations.nativeplace,
            idnumber: this.informations.idnumber,
            birthdate: this.informations.birthdate,
            politicsstatus: this.informations.politicsstatus,
            speciality: this.informations.speciality,
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
              this.$axios.post('http://127.0.0.1:4000/updatesin', newInformations).then(res => {
                this.$router.push('/student/sinformation');
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
    goback() {
      this.$router.push('/student/sinformation')
    }
  },
  created() {
    this.getinformation()
  }
}
</script>

<style >
.el-breadcrumb {
  margin-bottom: 20px;
}

.el-row :last-child {
  margin-bottom: 0;
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

.sinformation {
  width: 600px;
}
</style>