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
        console.log('添加部门')
        this.$emit('isShow', this.treeNode)
      } else if (item.id === 2) {
        // 查看部门
        console.log('查看部门')
      } else {
        // 删除部门
        console.log(this.treeNode.name)
        this.deleteDepartmentById(this.treeNode.id)
      }
    },
    // 删除部门
    async deleteDepartmentById(id) {
      try {
        await deleteDepartmentById(id)
        this.$emit('reloadPage')
      } catch (err) {
        console.error(err)
        Promise.reject(err)
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
