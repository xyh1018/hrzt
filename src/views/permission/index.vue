<template>
  <div class="permission-container">
    <div class="app-container">
      <pageTopTool>
        <template v-slot:right>
          <el-button size="small" type="primary" icon="el-icon-edit" @click="isShowMenu('0','新增编辑')">添加菜单</el-button>
        </template>
      </pageTopTool>
      <el-card>
        <el-table
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          default-expand-all
          :tree-props="{children: 'children'}"
        >
          <el-table-column
            prop="name"
            label="菜单名称"
          />
          <el-table-column
            prop="code"
            label="权限标识"
          />
          <el-table-column
            prop="description"
            label="描述"
          />
          <el-table-column
            label="操作"
            width="200"
          >
            <template v-slot="{row}">
              <el-button type="text" size="small" @click="isShowMenu(row.id,'添加权限')">添加权限点</el-button>
              <el-button type="text" size="small" @click="isShowMenu(row.id,'编辑权限')">查看</el-button>
              <el-button type="text" size="small" @click="deletePer(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-card>
    </div>
    <addMenu ref="addMenu" :user-id="id" :show-menu="showMenu" :title="title" @cancel="cancel" @submit="submit" />
  </div>
</template>

<script>
import addMenu from './components/add-menu.vue'
import { getPermission, deletePermission } from '@/api/permission'
import { arrayToTree } from '@/utils/index'
export default {
  components: {
    addMenu
  },
  data() {
    return {
      tableData: [],
      showMenu: false,
      id: '',
      title: ''
    }
  },
  created() {
    this.getPermission()
  },
  methods: {
    async getPermission() {
      const data = await getPermission()
      const tree = arrayToTree(data)
      this.tableData = tree
    },
    async deletePermission(id) {
      await deletePermission(id)
    },
    isShowMenu(id, title) {
      if (title === '编辑权限') {
        this.$refs.addMenu.getOnePermission(id)
      }
      this.title = title
      this.id = id
      this.showMenu = true
    },
    cancel() {
      this.showMenu = false
    },
    submit() {
      this.getPermission()
      this.showMenu = false
    },
    deletePer(data) {
      this.$confirm('是否继续删除该权限?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await this.deletePermission(data.id)
        await this.getPermission()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    async changePer(data) {
      await this.updatePermission(data.id)
      this.$message.success('更新成功！')
    }
  }
}
</script>

<style lang="scss">

</style>
