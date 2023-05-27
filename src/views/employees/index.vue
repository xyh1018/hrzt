<template>
  <div class="employees-container">
    <div class="app-container">
      <!-- 顶部工具条 -->
      <pageTopTool :show-left="true">
        <template #left>
          <span>共{{ total }}条员工记录</span>
        </template>
        <template #right>
          <el-button
            type="primary"
            size="small"
            class="right-button-one"
            @click="batchImport"
          >
            导入
          </el-button>
          <el-button
            type="primary"
            size="small"
            class="right-button-two"
            @click="exportData"
          >
            导出
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
            class="right-button-three"
            :disabled="!checkPermission('POINT-USER-ADD')"
            @click="isShow = true"
          >
            新增员工
          </el-button>
        </template>
      </pageTopTool>
      <el-card>
        <!-- 表格 -->
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column
            prop="index"
            label="序号"
            width="80"
            sortable
            type="index"
            align="center"
          />
          <el-table-column
            prop="username"
            label="姓名"
            width="80"
            sortable
            align="center"
          />
          <el-table-column label="头像" width="100" align="center">
            <template v-slot="{ row }">
              <img
                v-imageError="require('@/assets/common/bigUserHeader.png')"
                :src="row.staffPhoto"
                alt=""
                style="border-radius: 50%; width: 50px; height: 50px"
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号"
            min-width="115px"
            sortable
            align="center"
          />
          <el-table-column
            prop="workNumber"
            label="工号"
            min-width="115px"
            sortable
            header-align="center"
          />
          <el-table-column
            prop="formOfEmployment"
            label="聘用形式"
            width="115"
            sortable
            align="center"
            :formatter="formatEmployment"
          />
          <el-table-column
            prop="departmentName"
            label="部门"
            width="100"
            sortable
            align="center"
          />
          <el-table-column
            prop="timeOfEntry"
            label="入职时间"
            min-width="115px"
            sortable
            align="center"
          >
            <template v-slot="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column
            prop="enableState"
            label="状态"
            width="80"
            sortable
            align="center"
            :formatter="formatEnableState"
          />
          <el-table-column
            prop=""
            label="操作"
            sortable
            width="230"
            fixed="right"
            align="center"
          >
            <template v-slot="{ row }">
              <el-button
                size="small"
                type="text"
                @click="$router.push(`/employees/detail/${row.id}`)"
              >查看</el-button>
              <el-button size="small" type="text">转正</el-button>
              <el-button size="small" type="text">调岗</el-button>
              <el-button size="small" type="text">离职</el-button>
              <el-button
                size="small"
                type="text"
                @click="editRole(row.id)"
              >角色</el-button>
              <el-button
                size="small"
                type="text"
                :disabled="!checkPermission('point-user-delete')"
                @click="deleteEmp(row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-row type="flex" justify="center" align="center">
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            :page-size="page.size"
            :current-page="page.page"
            class="pagination"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
      <addEmp :is-show="isShow" @cancel="isShow = false" @submit="submit" />
      <assignRoles
        ref="assignRoles"
        :is-show="showAssignRoles"
        :user-id="userId"
        @cancel="showAssignRoles = false"
      />
    </div>
  </div>
</template>

<script>
import { getEmployee, deleteEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import addEmp from './components/add-emp.vue'
import { formatDate } from '@/filters/index'
import assignRoles from './components/assign-roles.vue'

export default {
  components: {
    addEmp,
    assignRoles
  },
  data() {
    return {
      tableData: [],
      page: {
        page: 1,
        size: 10
      },
      total: 0,
      isShow: false,
      showAssignRoles: false,
      userId: null
    }
  },
  created() {
    this.getEmployee()
  },
  methods: {
    // 获取员工列表
    async getEmployee() {
      const { rows, total } = await getEmployee(this.page)
      this.tableData = rows
      this.total = total
    },
    // 删除员工
    async deleteEmp(id) {
      try {
        await this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteEmployee(id)
        await this.getEmployee()
        this.$message.success('删除员工成功')
      } catch (err) {
        console.log(err)
      }
    },
    changePage(page) {
      this.page.page = page
      this.getEmployee()
    },
    // 格式化聘用形式
    formatEmployment(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find((item) => {
        return parseInt(item.id) === parseInt(cellValue)
      })
      return obj ? obj.value : '未知'
    },
    // 格式化状态
    formatEnableState(row, column, cellValue, index) {
      const obj = EmployeeEnum.workingState.find((item) => {
        return parseInt(item.id) === parseInt(cellValue)
      })
      return obj ? obj.value : '未知'
    },
    submit() {
      this.isShow = false
      this.getEmployee()
    },
    // 导入员工excel
    batchImport() {
      this.$router.push('/import')
    },
    // 导出员工数据
    async exportData() {
      const headers = {
        姓名: 'username',
        手机号: 'mobile',
        工号: 'workNumber',
        聘用形式: 'formOfEmployment',
        部门: 'departmentName',
        入职日期: 'timeOfEntry',
        转正日期: 'correctionTime'
      }
      const { rows } = await getEmployee({
        page: 1,
        size: this.total
      })
      const data = this.formatJson(headers, rows)
      console.log(data)
      import('@/vendor/Export2Excel').then((excel) => {
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data: data,
          filename: '员工列表',
          autoWidth: true,
          bookType: 'xlsx'
        })
      })
    },
    // 格式化员工列表数据为[[1,2,3],[1,2,3]]形式
    formatJson(headers, rows) {
      return rows.map((item) => {
        return Object.keys(headers).map((key) => {
          if (
            headers[key] === 'timeOfEntry' ||
            headers[key] === 'correctionTime'
          ) {
            // 格式化日期
            return formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            if (item[headers[key]] === '1') {
              return '正式'
            } else {
              return '非正式'
            }
          } else {
            return item[headers[key]]
          }
        })
      })
    },
    async editRole(id) {
      this.userId = id
      await this.$refs.assignRoles.getEmBaseInfo(id)
      this.showAssignRoles = true
    }
  }
}
</script>

<style lang="scss">
@media screen and (max-width: 600px) {
  .employees-container {
    .left {
      font-size: 14px;
      padding: 0 5px;
      width: 100%;
    }
    .page-tools .el-card__body {
      padding: 10px 5px;
    }
    .el-row--flex {
      flex-wrap: wrap;
    }
    .right {
      padding-top: 10px;
      display: flex;
    }
    .right-button-one,
    .right-button-two,
    .right-button-three {
      flex: 1;
    }
    .el-card__body {
      padding: 10px 5px 0px;
    }
    .pagination {
      margin: 10px 0;
    }
  }
}
</style>
