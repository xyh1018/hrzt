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
          >
            导入
          </el-button>
          <el-button
            type="primary"
            size="small"
            class="right-button-two"
          >
            导出
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
            class="right-button-three"
          >
            新增员工
          </el-button>
        </template>
      </pageTopTool>
      <el-card>
        <!-- 表格 -->
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
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
            <el-button
              size="small"
              type="text"
            >查看</el-button>
            <el-button
              size="small"
              type="text"
            >转正</el-button>
            <el-button
              size="small"
              type="text"
            >调岗</el-button>
            <el-button
              size="small"
              type="text"
            >离职</el-button>
            <el-button
              size="small"
              type="text"
            >角色</el-button>
            <el-button
              size="small"
              type="text"
            >删除</el-button>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-row
          type="flex"
          justify="center"
          align="center"
        >
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
    </div>
  </div>
</template>

<script>
import { getEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
export default {
  data() {
    return {
      tableData: [],
      page: {
        page: 1,
        size: 10
      },
      total: 0
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
      console.log(this.tableData)
    },
    changePage(page) {
      this.page.page = page
      this.getEmployee()
    },
    // 格式化聘用形式
    formatEmployment(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find((item) => {
        return item.id === cellValue
      })
      return obj ? obj.value : '未知'
    },
    // 格式化状态
    formatEnableState(row, column, cellValue, index) {
      const obj = EmployeeEnum.workingState.find((item) => {
        return item.id === cellValue
      })
      return obj ? obj.value : '未知'
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
