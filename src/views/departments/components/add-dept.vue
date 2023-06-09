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
        label="部门名称"
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item
        prop="code"
        label="部门编码"
      >
        <el-input v-model="form.code" />
      </el-form-item>
      <el-form-item
        prop="manager"
        label="部门负责人"
      >
        <el-select
          v-model="form.manager"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        prop="introduce"
        label="部门介绍"
      >
        <el-input v-model="form.introduce" />
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
import {
  setNewDepartment,
  getDepartmentList,
  getDepartmentDetailById,
  updateDepartmentDetailById
} from '@/api/departments'
export default {
  props: {
    isShow: {
      type: Boolean,
      require: true,
      default: false
    },
    options: {
      type: Array,
      require: true,
      default: null
    },
    currentTreeNode: {
      type: Object,
      require: true,
      default: null
    }
  },
  data() {
    // 检查部门名称是否重复
    const validateName = async(rule, value, callback) => {
      const { depts } = await this.getDepts()
      const deptNameList = []
      if (this.form.id) {
        depts.forEach((item) => {
          if (item.id !== this.form.id && item.pid === this.form.pid) {
            deptNameList.push(item.name)
          }
        })
      } else {
        depts.forEach((item) => {
        // 寻找当前节点的所有子节点
        // 检查item的pid等于当前节点的id
          if (item.pid === this.currentTreeNode.id) {
            deptNameList.push(item.name)
          }
        })
      }
      // isRepeat是一个Boolean值
      const isRepeat = deptNameList.some((name) => {
        return name === value
      })
      if (isRepeat) {
        callback(new Error(`已经存在${value}！请换个名称重试`))
      } else {
        callback()
      }
    }
    // 检查部门编码是否重复
    const validateCode = async(rule, value, callback) => {
      const { depts } = await this.getDepts()
      const deptCodeList = []
      if (this.form.id) {
        depts.forEach((item) => {
          if (item.id !== this.form.id) {
            deptCodeList.push(item.code)
          }
        })
      } else {
        depts.forEach((item) => {
          if (item.code) {
            deptCodeList.push(item.code)
          }
        })
      }
      const isRepeat = deptCodeList.some((code) => {
        return code === value
      })
      if (isRepeat) {
        callback(new Error(`部门编码重复！已经存在${value}`))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        code: '',
        introduce: '',
        manager: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '长度在 1 到 10 个字符',
            trigger: 'blur'
          },
          { validator: validateName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          {
            min: 1,
            max: 100,
            message: '长度在 1 到 100 个字符',
            trigger: 'blur'
          },
          { validator: validateCode, trigger: 'blur' }
        ],
        manager: [{ required: true, message: '请选择管理员', trigger: 'blur' }],
        introduce: [
          { required: true, message: '请填写部门简介', trigger: 'blur' },
          {
            min: 1,
            max: 100,
            message: '长度在 1 到 100 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    title() {
      if (this.form.id) {
        return '编辑部门'
      } else {
        return '添加部门'
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('cancelShow')
      this.$refs.form.resetFields()
    },
    submit() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          if (this.form.id) {
            await this.updateDeptsDetail(this.form.id, this.form)
            this.form = {}
            this.$emit('reloadPage', '部门更新成功')
          } else {
            await this.addDepts({
              ...this.form,
              pid: this.currentTreeNode.id
            })
            this.form = {}
            this.$emit('reloadPage', '部门添加成功！')
          }
        } else {
          return Promise.reject(new Error('校验失败，请检查必填项'))
        }
      })
    },
    // 添加部门
    async addDepts(data) {
      try {
        await setNewDepartment(data)
      } catch (err) {
        return Promise.reject(new Error('添加部门失败，请稍后重试！'))
      }
    },
    // 获取部门列表
    async getDepts() {
      try {
        return await getDepartmentList()
      } catch (err) {
        return Promise.reject(new Error('操作失败，请稍后重试'))
      }
    },
    // 获取部门详情
    async getDeptsDetail(id) {
      try {
        this.form = await getDepartmentDetailById(id)
        console.log('获取部门详情', this.form)
      } catch (err) {
        return Promise.reject(new Error('操作失败，请稍后重试'))
      }
    },
    // 更新部门详情
    async updateDeptsDetail(id, data) {
      try {
        await updateDepartmentDetailById(id, data)
      } catch (err) {
        return Promise.reject(new Error('操作失败，请稍后重试'))
      }
    }
  }
}
</script>

<style></style>
