<template>
  <el-row
    class="card-row"
    type="flex"
    justify="space-between"
  >
    <!-- 部门名称 -->
    <el-col>
      <span class="companyName">{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="8">
      <el-row
        type="flex"
        justify="end"
        align="middle"
      >
        <!-- 负责人 -->
        <el-col>
          <span class="manager">{{ treeNode.manager }}</span>
        </el-col>
        <el-col>
          <el-dropdown size="small">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in dropdownList"
                :key="item.id"
                @click.native="handleItemClick(item)"
              >{{ item.name }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import { deleteDepartmentById } from '@/api/departments'
import { MessageBox } from 'element-ui'
export default {
  props: {
    treeNode: {
      type: Object,
      require: true,
      default: null
    },
    dropdownList: {
      type: Array,
      require: true,
      default: null
    }
  },
  methods: {
    handleItemClick(item) {
      if (item.id === 1) {
        // 添加部门
        this.$emit('isShow', this.treeNode)
      } else if (item.id === 2) {
        // 编辑部门
        this.$emit('isShowEdit', this.treeNode)
      } else {
        // 删除部门
        MessageBox.confirm('此操作将删除该部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.deleteDepartmentById(this.treeNode.id)
        }).then(async() => {
          this.$emit('reloadPage', '删除部门成功')
        })
      }
    },
    // 删除部门
    async deleteDepartmentById(id) {
      try {
        await deleteDepartmentById(id)
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.companyName {
  font-size: 14px;
  font-weight: bold;
}
.el-dropdown-link {
  color: #4894fe;
}
.card-row {
  width: 100%;
}
.manager {
  font-size: 14px;
}
</style>
