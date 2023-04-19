<template>
  <div class="setting-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane
            label="角色管理"
            name="first"
          >
            <el-row class="row-button-margin">
              <el-col>
                <el-button
                  type="primary"
                  size="small"
                  icon="el-icon-plus"
                >新增角色</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-table
                  :data="tableData"
                  style="width: 100%"
                  border
                >
                  <el-table-column
                    type="index"
                    label="序号"
                    align="center"
                    width="55px"
                  />
                  <el-table-column
                    prop="name"
                    label="角色名称"
                  />
                  <el-table-column
                    prop="description"
                    label="描述"
                  />
                  <el-table-column
                    prop="address"
                    label="操作"
                    width="145"
                    align="center"
                  >
                    <el-button
                      size="small"
                      type="text"
                    >分配权限</el-button>
                    <el-button
                      size="small"
                      type="text"
                    >编辑</el-button>
                    <el-button
                      size="small"
                      type="text"
                    >删除</el-button>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
            <el-row
              type="flex"
              justify="center"
              align="center"
            >
              <el-pagination
                layout="prev, pager, next"
                :total="page.total"
                :page-size="page.pagesize"
                :current-page="page.page"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane
            label="公司信息"
            name="second"
          >
            <el-row class="row-alert">
              <el-col>
                <el-alert
                  :title="alertText"
                  type="info"
                  show-icon
                  :closable="false"
                />
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form
                  disabled
                  label-position="right"
                  label-width="80px"
                  :model="form"
                >
                  <el-form-item
                    class="formItem"
                    label="公司名称"
                  >
                    <el-input v-model="form.name" />
                  </el-form-item>
                  <el-form-item
                    class="formItem"
                    label="公司地址"
                  >
                    <el-input v-model="form.companyAddress" />
                  </el-form-item>
                  <el-form-item
                    class="formItem"
                    label="邮箱"
                  >
                    <el-input v-model="form.mailbox" />
                  </el-form-item>
                  <el-form-item
                    class="formItem"
                    label="备注"
                  >
                    <el-input
                      v-model="form.remarks"
                      type="textarea"
                    />
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getAllRole, getCompany } from '@/api/setting'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      activeName: 'first',
      alertText:
        '对公司名称，公司地址，营业执照，公司地区的更新，将使得公司资料被重新审核，请谨慎修改',
      tableData: [],
      form: {
        name: '',
        companyAddress: '',
        mailbox: '',
        remarks: ''
      },
      page: {
        page: 1,
        pagesize: 10,
        total: 0
      }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRole()
    this.getCompany()
  },
  methods: {
    // 获取所有角色
    async getRole() {
      const { total, rows } = await getAllRole(this.page)
      this.page.total = total
      this.tableData = rows
    },
    // 获取公司信息
    async getCompany() {
      this.form = await getCompany(this.companyId)
    },
    changePage(newPage) {
      this.page.page = newPage
      this.getRole()
    }
  }
}
</script>

<style lang="scss">
@media screen and (max-width: 600px) {
  .el-card__body {
    padding: 10px;
  }
}
.setting-container {
  .formItem {
    max-width: 400px;
  }
  .row-button-margin {
    margin-bottom: 15px;
  }
  .row-alert {
    margin-bottom: 15px;
  }
}
</style>
