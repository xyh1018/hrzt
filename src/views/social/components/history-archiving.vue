<template>
  <div class="history-archiving">
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
    >
      <el-menu-item index="1">全公司</el-menu-item>
    </el-menu>
    <el-row type="flex" justify="end" style="margin-bottom:10px">
      <el-date-picker
        v-model="year"
        type="year"
        placeholder="选择查询的年份"
        value-format="yyyy"
        @change="change"
      />
    </el-row>
    <div v-for="(item, index) in historyData" :key="index" class="social-list">
      <div class="social-item">
        <el-tag size="mini" type="success" effect="dark" style="color: white; font-size: 12px;">{{ formatYear(item.yearsMonth) }}</el-tag>
        <i
          class="el-icon-arrow-down"
          style="font-width: 500; font-size: 20px; flex: 1; display: flex; justify-content: space-evenly;"
          @click="onTable"
        />
        <div style="flex: 1;">
          <div>社保报表</div>
          <div
            style="margin-top: 8px;"
            :class="{showColor: showTable}"
            @click="onTable"
          >报表详细</div>
        </div>
      </div>
      <div class="social-item">
        <span>企业缴纳</span>
        <div class="big-font">{{ item.enterprisePayment }}</div>
      </div>
      <div class="social-item">
        <span>个人缴纳</span>
        <div class="big-font">{{ item.personalPayment }}</div>
      </div>
      <div class="social-item">
        <span>合计</span>
        <div class="big-font">{{ item.total }}</div>
      </div>
    </div>
    <el-table
      v-if="showTable"
      :data="tableData"
      border
      height="450"
      style="width: 100%; margin-top: 10px;"
    >
      <el-table-column
        type="index"
        label="序号"
        width="50"
      />
      <el-table-column
        prop="username"
        label="姓名"
        width="80"
      />
      <el-table-column
        prop="timeOfEntry"
        label="入职时间"
      />
      <el-table-column
        prop="mobile"
        label="手机号"
      />
      <el-table-column
        prop="idNumber"
        label="身份证号码"
      />
      <el-table-column
        prop="theHighestDegreeOfEducation"
        label="学历"
      />
      <el-table-column
        prop="openingBank"
        label="开户行"
      />
      <el-table-column
        prop="firstLevelDepartment"
        label="一级部门"
      />
      <el-table-column
        prop="twoLevelDepartment"
        label="二级部门"
      />
      <el-table-column
        prop="workingCity"
        label="工作城市"
      />
      <el-table-column
        prop="participatingInTheCity"
        label="参保城市"
      />
      <el-table-column
        prop="socialSecurityMonth"
        label="社保月份"
      />
      <el-table-column
        prop="socialSecurityBase"
        label="社保基数"
      />
    </el-table>
  </div>
</template>

<script>
import { getHistorysList, getListByMonth } from '@/api/social'
export default {
  data() {
    return {
      activeIndex: '1',
      historyData: [],
      tableData: null,
      showTable: false,
      year: ''
    }
  },
  created() {
    this.getHistorysList(this.year || 2020)
  },
  methods: {
    async getHistorysList(year) {
      this.historyData = await getHistorysList(year)
    },
    async getListByMonth(yearMonth, params) {
      this.tableData = await getListByMonth(yearMonth, params)
    },
    onTable() {
      if (!this.tableData) {
        this.getListByMonth('202001', {
          month: `${this.year}${'01'}`,
          year: this.year,
          opType: 2
        })
      }
      this.showTable = !this.showTable
    },
    formatYear(data) {
      if (data) {
        return data.slice(0, 4)
      }
      return '未知日期'
    },
    change() {
      this.getHistorysList(this.year)
    }
  }
}
</script>

<style lang="scss">
.history-archiving {
  height: 100vh;
  padding: 20px;
  background-color: white;
  .social-list {
    display: flex;
    height: 110px;
    padding: 20px;
    border-top: 1px solid #f0f0f0;
    border-bottom: 3px solid #ccc;
    &>div {
      border-right: 1px solid rgb(204, 204, 204);
      flex: 1;
    }
    & :nth-child(4) {
      border-right: none;
    }
    span {
      font-size: 13px;
      color: #999;
    }
    .big-font {
      font-size: 20px;
      font-weight: 400;
      margin-top: 10px;
    }
    .social-item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .social-item:first-child {
      display: flex;
      flex-direction: row;
    }
  }
  .el-menu--horizontal  {
    margin-bottom: 10px;
    .el-menu-item {
    height: 50px;
    }
    border-bottom: 0;
  }
  .showColor {
    color: #67C23A;
  }
}
</style>
