<template>
  <el-dialog
    title="调薪"
    :visible="showSalary"
    width="60%"
    :show-close="false"
    class="dislog"
  >
    <el-row type="flex" align="bottom">
      <el-col :span="6">
        <el-image
          style="width: 100px; height: 100px"
          :src="url"
          :fit="fit"
        />
      </el-col>
      <el-col :span="18">
        <el-row style="padding-bottom: 20px">
          <span><h4>部门：</h4>{{ row.departmentName }}</span>
        </el-row>
        <el-row>
          <span><h4>入职时间：</h4>{{ row.timeOfEntry | formatDate }}</span>
        </el-row>
      </el-col>
    </el-row>
    <el-divider />
    <el-row>
      <el-form
        :model="form"
        label-width="100px"
      >
        <el-form-item label="调整基本工资">
          <el-input v-model="oldform.currentBasicSalary" :disabled="true" />
          <span class="jiantou">-></span>
          <el-input v-model="form.currentBasicSalary" placeholder="输入调整后的基本工资" />
        </el-form-item>
        <el-form-item label="调整岗位工资">
          <el-input v-model="oldform.currentPostWage" :disabled="true" />
          <span class="jiantou">-></span>
          <el-input v-model="form.currentPostWage" placeholder="输入调整后的岗位工资" />
        </el-form-item>
        <el-form-item label="工资合集">
          <el-input v-model="totalSalary" :disabled="true" />
          <span class="jiantou">-></span>
          <el-input v-model="total" :disabled="true" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">保存</el-button>
          <el-button @click="close">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </el-dialog>
</template>

<script>
import { getSalarys, setSalarys } from '@/api/salarys'
export default {
  props: {
    showSalary: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      form: {
        currentBasicSalary: '',
        currentPostWage: '',
        userId: ''
      },
      oldform: {
        currentBasicSalary: 0,
        currentPostWage: 0
      }
    }
  },
  computed: {
    totalSalary() {
      return this.oldform.currentBasicSalary + this.oldform.currentPostWage
    },
    total() {
      return Number(this.form.currentBasicSalary) + Number(this.form.currentPostWage)
    }
  },
  methods: {
    async submit() {
      this.$emit('closeSalary')
      await this.setSalarys()
      this.form = {
        currentBasicSalary: '',
        currentPostWage: '',
        userId: ''
      }
      this.$message.success('调薪成功！')
    },
    close() {
      this.$emit('closeSalary')
      this.form = {
        currentBasicSalary: '',
        currentPostWage: '',
        userId: ''
      }
    },
    async getSalarys(id) {
      this.form.userId = id
      this.oldform = await getSalarys(id)
    },
    async setSalarys() {
      await setSalarys(this.form.userId, this.form)
    }
  }
}
</script>

<style lang="scss">
.salarys-container {
  .dislog {
    .el-input__inner,.el-input {
    width: 180px;
  }
  .jiantou {
    padding: 0 10px;
  }
  h4 {
    display: inline;
  }
  }
}
</style>
