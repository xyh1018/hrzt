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
                  @click="addRole"
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
                    prop="operation"
                    label="操作"
                    width="145"
                    align="center"
                  >
                    <template slot-scope="{ row }">
                      <el-button
                        size="small"
                        type="text"
                      >分配权限</el-button>
                      <el-button
                        size="small"
                        type="text"
                        @click="editRole(row.id)"
                      >编辑</el-button>
                      <el-button
                        size="small"
                        type="text"
                        @click="deleteRole(row.id)"
                      >删除</el-button>
                    </template>
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
                class="pagination"
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
      <add-role
        ref="role"
        :is-show="isShow"
        @cancel="cancel"
        @closeShow="closeShow"
      />
    </div>
  </div>
</template>

<script>
import { getAllRole, getCompany, deleteRole } from '@/api/setting'
import { mapGetters } from 'vuex'
import { MessageBox } from 'element-ui'
import addRole from './components/add-role.vue'
export default {
  components: {
    addRole
  },
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
      },
      isShow: false
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
    // 删除角色
    async deleteRole(id) {
      try {
        await MessageBox.confirm('此操作将删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteRole(id)
        this.getRole()
        this.$message.success('删除角色成功')
      } catch (err) {
        console.log(err)
      }
    },
    changePage(newPage) {
      this.page.page = newPage
      this.getRole()
    },
    addRole() {
      this.isShow = true
    },
    editRole(id) {
      this.$refs.role.getRoleDetail(id)
      this.isShow = true
    },
    // 点击取消按钮，调用
    cancel() {
      this.isShow = false
    },
    // 点击完成按钮，调用
    closeShow() {
      this.isShow = false
      this.getRole()
    }
  }
}
</script>

<style lang="scss">
@media screen and (max-width: 600px) {
  .el-card__body {
    padding: 5px;
  }
  .pagination {
    margin: 10px 0;
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
