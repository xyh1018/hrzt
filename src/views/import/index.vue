<template>
  <div class="app-container import-card">
    <el-card>
      <el-row><el-button type="text" icon="el-icon-arrow-left" size="medium" @click="back">返回</el-button></el-row>
      <el-row class="import-row" type="flex" justify="center">
        <span class="import-span">员工导入</span>
      </el-row>
      <el-alert
        title="每次导入仅可添加1000名员工，姓名、手机、入职时间、聘用形式为必填项"
        type="warning"
        show-icon
        :closable="false"
      />
      <uploadExcel :on-success="success" />
      <el-row>
        <span style="color: #409EFF;">示例</span>
      </el-row>
      <el-row style="margin-top: 10px; margin-bottom: 30px">
        <img src="https://xyh-1314748094.cos.ap-nanjing.myqcloud.com/%E4%BA%BA%E5%8A%9B%E8%B5%84%E6%BA%90/el.jpg" class="img">
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  data() {
    return {
    }
  },
  methods: {
    async success(data) {
      const { results } = data
      const userRelations = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '工号': 'workNumber',
        '转正日期': 'correctionTime'
      }
      const arr = results.map((item) => {
        const userInfo = {}
        Object.keys(item).forEach((key) => {
          if (userRelations[key] === 'timeOfEntry' || userRelations[key] === 'correctionTime') {
            userInfo[userRelations[key]] = new Date(this.formatDate(item[key], '/'))
          } else {
            userInfo[userRelations[key]] = item[key]
          }
        })
        return userInfo
      })
      await this.importEmployee(arr)
      this.$message.success('导入员工信息成功！')
    },
    async importEmployee(arr) {
      await importEmployee(arr)
    },
    back() {
      this.$router.back()
    },
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style lang="scss">
.import-card {
  .import-span {
    font-size: 22px;
    font-weight: bolder;
  }
  .el-alert--warning {
    margin-top: 25px;
  }
  .upload-excel {
    padding-bottom: 50px;
  }
  .img {
    width: 100%;
    max-width: 700px;
    // height: 80px;
  }
}
</style>
