<template>
  <div class="salarys-container">
    <div class="app-container">
      <pageTopTool :show-left="true">
        <template #left>
          <span>本月：入职 离职 调薪 未定薪</span>
        </template>
        <template #right>
          <el-button type="text">设置</el-button>
        </template>
      </pageTopTool>
      <el-card style="margin-bottom: 10px">
        <el-row>
          <el-col :span="3">
            <span class="checkbox-name">聘用形式：</span>
          </el-col>
          <el-col :span="21">
            <el-checkbox-group v-model="checkList.formOfEmployment">
              <el-checkbox
                v-for="item in listOne"
                :key="item.value"
                :label="item"
                @change="checkboxChange"
              >
                {{ item.value }}
              </el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
        <el-row class="row-top-bottom">
          <el-col :span="3">
            <span class="checkbox-name">员工状态：</span>
          </el-col>
          <el-col :span="21">
            <el-checkbox-group v-model="checkList.inServiceStatus">
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
                v-for="item in listThree"
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
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号" />
          <el-table-column prop="username" label="姓名" />
          <el-table-column prop="mobile" label="手机" />
          <el-table-column prop="workNumber" label="工号" />
          <el-table-column
            prop="formOfEmployment"
            label="聘用形式"
            :formatter="formatEmployment"
          />
          <el-table-column prop="departmentName" label="部门" />
          <el-table-column prop="timeOfEntry" label="入职时间">
            <template v-slot="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="工资基数">
            <template v-slot="{ row }">
              {{ row.currentBasicSalary + row.currentPostWage }}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="津贴方案">
            通用方案
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template v-slot="{ row }">
              <el-button type="primary" size="small" @click="showSalaryPage(row)">调薪</el-button>
              <el-button
                plain
                size="small"
                @click="$router.push(`/salarys/detail/${row.id}`)"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[10, 20, 30]"
            :page-size="pageSize"
            layout="sizes, prev, pager, next, jumper"
            :total="total"
            style="padding-top: 20px"
            @current-change="changePage"
            @size-change="changeSize"
          />
        </el-row>
      </el-card>
      <changeSalary
        ref="salary"
        :show-salary="showSalary"
        :user-id="userId"
        :row="rowInfo"
        @closeSalary="closeSalary"
      />
    </div>
  </div>
</template>

<script>
import { getSalarysList } from '@/api/salarys'
import EmployeeData from '@/api/constant/employees'
import { getDepartmentList } from '@/api/departments'
import changeSalary from './components/change-salary.vue'

export default {
  name: 'Salarys',
  components: {
    changeSalary
  },
  data() {
    return {
      checkList: {
        formOfEmployment: [],
        inServiceStatus: [],
        departmentName: []
      },
      listOne: [
        { id: 1, value: '正式' },
        { id: 2, value: '非正式' }
      ],
      listTwo: [
        { id: 1, value: '在职' },
        { id: 2, value: '离职' }
      ],
      listThree: [],
      tableData: [],
      approvalsType: EmployeeData.hireType,
      total: 0,
      pageSize: 10,
      currentPage: 1,
      showSalary: false,
      userId: '',
      rowInfo: {}
    }
  },
  created() {
    this.getSalarysList()
    this.getDepartmentList()
  },
  methods: {
    // 获取工资列表
    async getSalarysList() {
      const { rows, total } = await getSalarysList({
        page: this.currentPage,
        pageSize: this.pageSize
      })
      this.tableData = rows
      this.total = total
    },
    // 获取部门列表
    async getDepartmentList() {
      const { depts } = await getDepartmentList()
      depts.forEach((item) => {
        if (item.code !== '1') {
          this.listThree.push(item.name)
        }
      })
    },
    // 格式化部门
    formatEmployment(row) {
      const data = this.approvalsType.find(
        (item) => item.id === row.formOfEmployment
      )
      return data ? data.value : '未知'
    },
    changePage(newPage) {
      this.currentPage = newPage
      this.getSalarysList()
      this.checkList = {
        formOfEmployment: [],
        inServiceStatus: [],
        departmentName: []
      }
    },
    changeSize(num) {
      this.pageSize = num
      this.getSalarysList()
    },
    async checkboxChange() {
      const newData = []
      if (
        this.checkList['formOfEmployment'].length === 0 &&
        this.checkList['inServiceStatus'].length === 0 &&
        this.checkList['departmentName'].length === 0
      ) {
        await this.getSalarysList()
        return
      }
      await this.getSalarysList()
      const list = Object.keys(this.checkList)
      // 数据筛选
      list.forEach((item) => {
        this.tableData.forEach((obj) => {
          Object.keys(obj).forEach((key) => {
            if (key === item) {
              this.checkList[item].forEach((o) => {
                const ok = typeof o === 'object'
                if (ok) {
                  if (obj[key] === o.id) {
                    newData.push(obj)
                  }
                } else {
                  if (obj[key] === o) {
                    newData.push(obj)
                  }
                }
              })
            }
          })
        })
      })
      // 数据去重
      const data = newData.filter((item, index, array) => {
        return array.findIndex(i => {
          return i.id === item.id
        }) === index
      })
      this.tableData = data
    },
    closeSalary() {
      this.showSalary = false
    },
    showSalaryPage(row) {
      this.rowInfo = row
      this.userId = row.id
      this.showSalary = true
      this.$refs.salary.getSalarys(row.id)
    }
  }
}
</script>

<style lang="scss">
.checkbox-name {
  font-size: 14px;
}
.el-checkbox__label {
  font-weight: normal;
}
.row-top-bottom {
  padding: 5px 0;
}
</style>
