<template>
  <div class="sinformation">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>学籍管理</el-breadcrumb-item>
    </el-breadcrumb>

    <div style="margin: 20px;"></div>
    <el-form label-width="110px" ref="resetform" :model="informations" :disabled="isdisabled">
      <el-row :gutter="20" style="margin-bottom: 20px;">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="informations.name" placeholder="但双信"></el-input>
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
    <el-button type="primary" @click="goidet">修改学籍信息</el-button>
  </div>
</template>

<script>
export default {
  name: 'Sinformation',
  data() {
    return {
      informations: {},
      isdisabled: true
    }
  },
  methods: {
    getinformation() {
      this.$axios.get('http://127.0.0.1:4000/sinformation').then(res => {
        // console.log(res.data.sinformation);
        this.informations = res.data.sinformation[0]
        // console.log(this.informations);
      })
    },
    goidet() {
      this.$router.push('/student/updatesin')
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