<template>
  <div class="detail-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane
            label="登陆账户设置"
            name="set"
          >
            <el-form
              ref="form"
              :model="form"
              :rules="rules"
              label-width="80px"
            >
              <el-form-item
                label="姓名"
                prop="username"
              >
                <el-input v-model="form.username" />
              </el-form-item>
              <el-form-item
                label="密码"
                prop="password"
              >
                <el-input
                  v-model="form.password"
                  type="password"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submit"
                >更新</el-button>
                <el-button @click="cancel">取消</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane
            label="个人详情"
            name="detail"
          >
            <el-row type="flex" justify="end">
              <el-tooltip content="打印个人基本信息">
                <router-link :to="`/employees/print/${userId}?type=personal`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <userDetail />
          </el-tab-pane>
          <el-tab-pane
            label="岗位信息"
            name="info"
          >
            <el-row type="flex" justify="end">
              <el-tooltip content="打印岗位信息">
                <router-link :to="`/employees/print/${userId}?type=job`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <jonInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import jonInfo from '@/views/employees/components/job-info.vue'
import userDetail from '@/views/employees/components/user-detail.vue'
import { getUserDetailById } from '@/api/user'
import { saveUserInfo } from '@/api/employees'

export default {
  components: {
    jonInfo,
    userDetail
  },
  data() {
    return {
      activeName: 'set',
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      userId: this.$route.params.id
    }
  },
  created() {
    this.getUserDetail()
  },
  methods: {
    submit() {
      this.$refs.form.validate().then(async() => {
        await this.saveUserInfo()
        this.$message.success('更新员工信息成功！')
      })
    },
    cancel() {
      // 取消时返回上一页
      this.$router.back()
    },
    // 获取员工信息
    async getUserDetail() {
      this.form = await getUserDetailById(this.userId)
      console.log(this.form)
    },
    // 保存用户信息
    async saveUserInfo() {
      await saveUserInfo({ ...this.form })
    }
  }
}
</script>

<style lang="scss">
.detail-container {
  .el-input {
    max-width: 350px;
  }
}
</style>
