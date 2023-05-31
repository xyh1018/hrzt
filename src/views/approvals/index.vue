<template>
  <div class="approvals-container">
    <div class="app-container">
      <pageTopTool :show-left="true">
        <template #left>
          <span>当前审批中 0 本月审批通过 1 本月审批驳回 0</span>
        </template>
        <template #right>
          <el-button type="primary" size="small">流程设置</el-button>
        </template>
      </pageTopTool>
      <el-card>
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            type="selection"
            label="序号"
            align="center"
          />
          <el-table-column
            type="index"
            label="序号"
            align="center"
          />
          <el-table-column
            prop="processName"
            label="审批类型"
          />
          <el-table-column
            prop="username"
            label="申请人"
          />
          <el-table-column
            prop="procCurrNodeUserName"
            label="当前审批人"
          />
          <el-table-column
            prop="procApplyTime"
            label="审批发起时间"
          >
            <template v-slot="scope">
              {{ scope.row.procApplyTime | formatDate }}
            </template>
          </el-table-column>
          <el-table-column
            prop="processState"
            label="审批状态"
          >
            <template v-slot="scope">
              <span v-if="scope.row.processState==='0'" class="rovalsState">
                <em class="sub" />已提交
              </span>
              <span v-if="scope.row.processState==='1'" class="rovalsState">
                <em class="stay" />审批中
              </span>
              <span v-if="scope.row.processState==='2'" class="rovalsState">
                <em class="adopt" />审批通过
              </span>
              <span v-if="scope.row.processState==='3'" class="rovalsState">
                <em class="reject" />审批不通过
              </span>
              <span v-if="scope.row.processState==='4'" class="rovalsState">
                <em class="revoke" />撤销
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
          >
            <el-button type="text" size="small">查看详情</el-button>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getApprovalList } from '@/api/approvals'

export default {
  name: 'Approvals',
  data() {
    return {
      checkList: {
        formOfEmployment: [],
        inServiceStatus: [],
        departmentName: []
      },
      listOne: [],
      listTwo: ['北京'],
      listThree: ['北京'],
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  created() {
    this.getApprovalList()
  },
  methods: {
    async getApprovalList() {
      const { rows, total } = await getApprovalList(this.currentPage, this.pageSize)
      this.tableData = rows
      this.total = total
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

