<template>
  <el-dialog
    :title="title"
    :visible="showMenu"
    width="60%"
    :show-close="false"
  >
    <el-form ref="form" :model="form" status-icon :rules="rules" label-width="80px">
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="form.name" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="form.code" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="权限描述" prop="description">
        <el-input v-model="form.description" type="text" />
      </el-form-item>
      <el-form-item label="企业可见">
        <el-switch
          v-model="form.enVisible"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addPermission, updatePermission, getOnePermission } from '@/api/permission'
export default {
  props: {
    showMenu: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '添加权限'
    },
    userId: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      form: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 提交按钮
    submit() {
      this.$refs.form.validate((ok) => {
        if (ok) {
          if (this.title === '编辑权限') {
            this.updatePermission(this.userId, this.form)
            this.$emit('submit')
          } else {
            this.form.pid = this.userId
            this.addPer()
            this.$emit('submit')
          }
        } else {
          return
        }
      })
    },
    // 取消按钮
    cancel() {
      this.$emit('cancel')
      this.$refs.form.resetFields()
      this.form = {
        name: '', code: '', description: '', type: '', pid: '', enVisible: '0'
      }
    },
    // 添加权限 api
    async addPermission() {
      await addPermission(this.form)
    },
    // 更新权限 api
    async updatePermission() {
      await updatePermission(this.userId, this.form)
    },
    // 根据id获取用户权限 api
    async getOnePermission(id) {
      this.form = await getOnePermission(id)
    },
    // 添加权限
    async addPer() {
      await this.addPermission()
      this.$message.success('添加成功！')
    }
  }
}
</script>

<style>

</style>
