<template>
  <el-dialog
    title="为【】分配权限"
    :visible="isShow"
    width="60%"
    :show-close="false"
  >
    <el-tree
      ref="tree"
      :data="treeData"
      :props="defaultProps"
      :default-checked-keys="defaultChecked"
      show-checkbox
      default-expand-all
      :check-strictly="true"
      node-key="id"
    />
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getPermission } from '@/api/permission'
import { setRolePermission, getRoleDetail } from '@/api/setting'
import { arrayToTree } from '@/utils/index'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      defaultChecked: []
    }
  },
  methods: {
    submit() {
      this.setRolePermission(this.id, this.$refs.tree.getCheckedKeys())
      this.$emit('cancelAssign')
      this.$message.success('保存成功')
    },
    cancel() {
      this.$emit('cancelAssign')
    },
    // 获取权限列表
    async getPermission() {
      const data = await getPermission()
      this.treeData = arrayToTree(data)
    },
    // 给角色分配权限
    async setRolePermission(id, arr) {
      await setRolePermission({ id: id, permIds: arr })
    },
    // 获取角色的权限id数组
    async getRoleDetail(id) {
      const { permIds } = await getRoleDetail(id)
      this.defaultChecked = permIds
    }
  }
}
</script>
