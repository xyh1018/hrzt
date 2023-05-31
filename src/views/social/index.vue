<template>
  <div class="social-container">
    <div class="app-container">
      <pageTopTool :show-left="true">
        <template #left>
          <span> 本月：社保在缴 公积金在缴 增员 减员 入职 离职</span>
        </template>
        <template #right>
          <el-button type="text" @click="$router.push('social/historicalArchiving')">历史归档</el-button>
        </template>
      </pageTopTool>
      <el-card style="margin-bottom: 10px">
        <el-row>
          <el-col :span="3">
            <span class="checkbox-name">部门：</span>
          </el-col>
          <el-col :span="21">
            <el-checkbox-group v-model="checkList.departmentName">
              <el-checkbox
                v-for="(item, index) in listOne"
                :key="index"
                :label="item"
                @change="checkboxChange"
              />
            </el-checkbox-group>
          </el-col>
        </el-row>
        <el-row class="row-top-bottom">
          <el-col :span="3">
            <span class="checkbox-name">社保城市：</span>
          </el-col>
          <el-col :span="21">
            <el-checkbox-group v-model="checkList.participatingInTheCity">
              <el-checkbox
                v-for="(item, index) in listTwo"
                :key="index"
                :label="item"
                @change="checkboxChange"
              />
            </el-checkbox-group>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <span class="checkbox-name">公积金城市：</span>
          </el-col>
          <el-col :span="21">
            <el-checkbox-group v-model="checkList.providentFundCity">
              <el-checkbox
                v-for="(item, index) in listThree"
                :key="index"
                :label="item"
                @change="checkboxChange"
              />
            </el-checkbox-group>
          </el-col>
        </el-row>
      </el-card>
      <el-card>
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            align="center"
          />
          <el-table-column
            prop="username"
            label="姓名"
          />
          <el-table-column
            prop="mobile"
            label="手机"
            width="110"
          />
          <el-table-column
            prop="workNumber"
            label="工号"
            width="60"
          />
          <el-table-column
            prop="departmentName"
            label="部门"
          />
          <el-table-column
            prop="timeOfEntry"
            label="入职时间"
            width="100"
          />
          <el-table-column
            prop="leaveTime"
            label="离职时间"
            width="100"
          />
          <el-table-column
            prop="participatingInTheCity"
            label="社保城市"
          />
          <el-table-column
            prop="providentFundCity"
            label="公积金城市"
            width="100"
          />
          <el-table-column
            prop="socialSecurityBase"
            label="社保基数"
          />
          <el-table-column
            prop="providentFundBase"
            label="公积金基数"
            width="100"
          />
          <el-table-column
            label="操作"
          >
            <el-button type="text" size="small">查看详情</el-button>
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
    </div>
  </div>
</template>

<script>
import { getDepartmentList } from '@/api/departments'
import { getSocialList } from '@/api/social'
export default {
  name: 'SocialSecuritys',
  data() {
    return {
      checkList: {
        participatingInTheCity: [],
        providentFundCity: [],
        departmentName: []
      },
      listOne: [],
      listTwo: ['北京'],
      listThree: ['北京'],
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10
    }
  },
  created() {
    this.getDepartmentList()
    this.getSocialList()
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
    async getSocialList() {
      const { rows, total } = await getSocialList({
        page: this.currentPage,
        pageSize: this.pageSize
      })
      this.tableData = rows
      this.total = total
    },
    changePage(newPage) {
      this.currentPage = newPage
      this.getSocialList()
    },
    changeSize(num) {
      this.pageSize = num
      this.getSocialList()
    },
    async checkboxChange() {
      const newData = []
      if (
        this.checkList['participatingInTheCity'].length === 0 &&
        this.checkList['providentFundCity'].length === 0 &&
        this.checkList['departmentName'].length === 0
      ) {
        await this.getSocialList()
        return
      }
      await this.getSocialList()
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
