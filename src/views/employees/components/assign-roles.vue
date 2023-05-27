<template>
  <el-dialog
    title="分配角色"
    :visible="isShow"
    width="70%"
    :show-close="false"
  >
    <el-checkbox-group v-model="roleList">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        size="small"
        @click="cancel"
      >取 消</el-button>
      <el-button
        size="small"
        type="primary"
        @click="submit"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getAllRole } from '@/api/setting'
import { getEmBaseInfo, assignRoles } from '@/api/employees'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      list: [],
      roleList: []
    }
  },
  created() {
    this.getAllRole()
  },
  methods: {
    // 取消按钮
    cancel() {
      this.$emit('cancel')
    },
    // 确定按钮
    submit() {
      // 调用分配角色接口
      this.assignRoles()
      // 关闭弹层
      this.$emit('cancel')
    },
    // 获取所有角色
    async getAllRole() {
      const { rows } = await getAllRole({ page: 1, pagesize: 5 })
      this.list = rows
    },
    // 获取员工已有角色
    async getEmBaseInfo(id) {
      const { roleIds } = await getEmBaseInfo(id)
      this.roleList = roleIds
    },
    // 分配角色
    async assignRoles() {
      await assignRoles({
        id: this.userId,
        roleIds: this.roleList
      })
      this.$message.success('给用户分配角色成功')
    }
  }
}
</script>

<style lang="scss">
.employees-container .el-dialog__body {
  padding: 30px 20px 20px 20px;
}
</style>
