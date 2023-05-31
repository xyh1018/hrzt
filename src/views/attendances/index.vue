<template>
  <div class="attendances-container">
    <div class="app-container">
      <pageTopTool :show-left="true">
        <template #left>
          <span>有 0 条考勤审批尚未处理</span>
        </template>
        <template #right>
          <el-button type="primary" size="small">导入</el-button>
          <el-button type="primary" size="small">提醒</el-button>
          <el-button type="primary" size="small">设置</el-button>
          <el-button type="primary" size="small">历史归档</el-button>
          <el-button type="primary" size="small">3月份报表</el-button>
        </template>
      </pageTopTool>
      <el-card style="margin-bottom: 10px">
        <el-row class="row-top-bottom">
          <el-col :span="3">
            <span class="checkbox-name">考勤状态：</span>
          </el-col>
          <el-col :span="21">
            <el-checkbox-group v-model="checkList.adtStatu">
              <el-checkbox
                v-for="item in listTwo"
                :key="item.value"
                :label="item"
                @change="checkboxChange"
              >
                {{ item.value }}
              </el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <span class="checkbox-name">部门：</span>
          </el-col>
          <el-col :span="21">
            <el-checkbox-group v-model="checkList.departmentName">
              <el-checkbox
                v-for="item in listOne"
                :key="item"
                :label="item"
                @change="checkboxChange"
              >
                {{ item }}
              </el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
      </el-card>
      <el-card>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            width="100"
          />
          <el-table-column
            prop="username"
            label="姓名"
          />
          <el-table-column
            prop="workNumber"
            label="工号"
          />
          <el-table-column
            prop="departmentName"
            label="部门"
          />
          <el-table-column
            prop="mobile"
            label="手机"
          />
        </el-table>
        <el-row type="flex" justify="end">
          <el-pagination
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getDepartmentList } from '@/api/departments'
import { getAttendList } from '@/api/attendances'
export default {
  name: 'Attendances',
  data() {
    return {
      checkList: {
        departmentName: [],
        adtStatu: []
      },
      listOne: [],
      listTwo: [
        { id: 1, value: '正常' },
        { id: 2, value: '矿工' },
        { id: 3, value: '迟到' },
        { id: 4, value: '早退' },
        { id: 8, value: '事假' },
        { id: 17, value: '调休' }
      ],
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  created() {
    this.getDepartmentList()
    this.getAttendList()
  },
  methods: {
    async getDepartmentList() {
      const { depts } = await getDepartmentList()
      depts.forEach((item) => {
        if (item.code !== '1') {
          this.listOne.push(item.name)
        }
      })
    },
    async getAttendList() {
      const { data: { rows, total }} = await getAttendList({
        page: this.currentPage,
        pagesize: this.pageSize
      })
      this.tableData = rows
      this.total = total
    },
    async checkboxChange() {
      const newData = []
      if (
        this.checkList['departmentName'].length === 0 &&
        this.checkList['adtStatu'].length === 0
      ) {
        await this.getAttendList()
        return
      }
      await this.getAttendList()
      // 数据筛选
      if (this.checkList['departmentName'].length !== 0) {
        this.checkList['departmentName'].forEach(item => {
          this.tableData.forEach(obj => {
            if (obj['departmentName'] === item) {
              newData.push(obj)
            }
          })
        })
      }
      if (this.checkList['adtStatu'].length !== 0) {
        this.checkList['adtStatu'].forEach(item => {
          this.tableData.forEach(obj => {
            if (obj['adtStatu'] === item.id) {
              newData.push(obj)
            }
          })
        })
      }
      // 数据去重
      const data = newData.filter((item, index, array) => {
        return array.findIndex(i => {
          return i.id === item.id
        }) === index
      })
      this.tableData = data
    },
    changePage(newPage) {
      this.currentPage = newPage
      this.getAttendList()
    }
  }
}
</script>

<style lang="scss">
.attendances-container {
  .el-checkbox__label {
  font-weight: normal;
  }
  .checkbox-name {
    font-size: 14px;
  }
}
</style>
