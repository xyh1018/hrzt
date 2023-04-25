<template>
  <el-dialog
    title="添加员工"
    :visible="isShow"
    width="60%"
    :show-close="false"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
      class="addEmp-form"
    >
      <el-form-item
        prop="username"
        label="姓名"
      >
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item
        prop="mobile"
        label="手机"
      >
        <el-input v-model="form.mobile" />
      </el-form-item>
      <el-form-item
        prop="timeOfEntry"
        label="入职时间"
      >
        <el-date-picker
          v-model="form.timeOfEntry"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item
        prop="formOfEmployment"
        label="聘用形式"
      >
        <el-select
          v-model="form.formOfEmployment"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        prop="workNumber"
        label="工号"
      >
        <el-input v-model="form.workNumber" />
      </el-form-item>
      <el-form-item
        prop="departmentName"
        label="部门"
      >
        <!-- <el-input v-model="form.departmentName" /> -->
        <el-cascader
          v-model="form.departmentName"
          :options="departments"
          :props="defaultProps"
          :show-all-levels="false"
          @change="change"
        />
      </el-form-item>
      <el-form-item
        prop="correctionTime"
        label="转正时间"
      >
        <el-date-picker
          v-model="form.correctionTime"
          type="date"
          placeholder="选择日期"
        />
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
import { addEmployee } from '@/api/employees'
import { getDepartmentList } from '@/api/departments'
import { arrayToTree } from '@/utils/index'

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        username: '',
        mobile: '',
        timeOfEntry: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        correctionTime: ''
      },
      rules: {
        username: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        timeOfEntry: [
          { required: true, message: '请输入入职时间', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '请输入聘用形式', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '请输入工号', trigger: 'blur' },
          {
            pattern: /^[0-9]*$/,
            message: '工号必须是数字',
            trigger: 'blur'
          }
        ],
        departmentName: [
          { required: true, message: '请输入所在部门', trigger: 'blur' }
        ],
        correctionTime: [
          { required: true, message: '请选择转正时间', trigger: 'blur' }
        ]
      },
      options: [
        {
          value: 1,
          label: '正式'
        },
        {
          value: 2,
          label: '非正式'
        }
      ],
      departments: [
        {
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }
      ],
      defaultProps: {
        value: 'name',
        label: 'name',
        children: 'children'
      }
    }
  },
  mounted() {
    this.getDepartment()
  },
  methods: {
    async submit() {
      this.$refs.form.validate(async(ok) => {
        if (ok) {
          await this.addEmployee()
          this.$emit('submit')
          this.$message.success('添加员工成功')
        }
      })
      this.form = {
        username: '',
        mobile: '',
        timeOfEntry: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        correctionTime: ''
      }
    },
    cancel() {
      this.$emit('cancel')
      this.$refs.form.resetFields()
    },
    async addEmployee() {
      await addEmployee(this.form)
    },
    async getDepartment() {
      const { depts } = await getDepartmentList()
      this.departments = arrayToTree(depts)
    },
    change(value) {
      const num = value.length
      this.form.departmentName = value[num - 1]
    }
  }
}
</script>

<style lang="scss">
.employees-container {
  .el-dialog__body {
    padding: 20px 20px 0;
  }
  .el-dialog {
    margin-top: 8vh !important;
  }
}
</style>
