<template>
  <el-dialog
    :title="title"
    :visible="isShow"
    width="60%"
    :show-close="false"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
      class="form"
    >
      <el-form-item
        prop="name"
        label="角色名称"
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item
        prop="description"
        label="角色表述"
      >
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel">取 消</el-button>
      <el-button
        type="primary"
        @click="submit"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addRole, updateRole, getRoleDetail } from '@/api/setting'

export default {
  props: {
    isShow: {
      type: Boolean,
      require: true,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ]
      },
      title: '新增角色'
    }
  },
  methods: {
    async submit() {
      try {
        await this.$refs.form.validate()
        if (this.form.id) {
          try {
            this.updateRole()
            this.$emit('closeShow')
            this.$message.success('编辑角色成功')
            this.form = {
              name: '',
              description: ''
            }
          } catch (err) {
            console.log(err)
          }
        } else {
          this.addRole()
          this.$emit('closeShow')
          this.$message.success('添加角色成功')
          this.form = {
            name: '',
            description: ''
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    cancel() {
      this.$emit('cancel')
      this.$refs.form.resetFields()
    },
    // 添加角色
    async addRole() {
      await addRole(this.form)
    },
    // 更新角色
    async updateRole() {
      await updateRole(this.form.id, this.form)
    },
    // 获取角色详情
    async getRoleDetail(id) {
      this.form = await getRoleDetail(id)
    }
  }
}
</script>

<style></style>
