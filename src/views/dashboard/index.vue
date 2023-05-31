<template>
  <div class="app-container">
    <div class="dashboard-container">
      <el-row>
        <el-card>
          <el-row type="flex">
            <div class="top-bar-left">
              <el-image
                style="width: 100px; height: 100px; border-radius: 50%"
                :src="url"
                fit="cover"
              />
            </div>
            <el-col class="top-bar-right">
              <span class="right-span">早安，{{ name }}，祝你开心每一天！</span>
              <span>{{ name }} | {{ company }} - {{ department }}</span>
            </el-col>
          </el-row>
        </el-card>
      </el-row>
      <el-row type="flex">
        <el-col :span="12" class="margin-col-left">
          <el-row>
            <el-card>
              <span class="title">工作日历</span>
              <el-divider />
              <el-calendar />
            </el-card>
          </el-row>
          <el-row>
            <el-card>
              <span class="title">公告</span>
              <el-divider />
              <div>
                <el-row type="flex">
                  <el-col :span="4">
                    <el-row type="flex" justify="center" align="center">
                      <el-image
                        style="width: 40px; height: 40px; border-radius: 50%;"
                        :src="url"
                        fit="fit"
                      />
                    </el-row>
                  </el-col>
                  <el-col :span="20">
                    <el-row>
                      朱继柳 发布了 第1期“传智大讲堂”互动讨论获奖名单公布
                    </el-row>
                    <el-row>
                      2018-07-21 15:21:38
                    </el-row>
                  </el-col>
                </el-row>
                <el-divider />
              </div>
              <div>
                <el-row type="flex">
                  <el-col :span="4">
                    <el-row type="flex" justify="center" align="center">
                      <el-image
                        style="width: 40px; height: 40px; border-radius: 50%;"
                        :src="url"
                      />
                    </el-row>
                  </el-col>
                  <el-col :span="20">
                    <el-row>
                      朱继柳 发布了 第1期“传智大讲堂”互动讨论获奖名单公布
                    </el-row>
                    <el-row>
                      2018-07-21 15:21:38
                    </el-row>
                  </el-col>
                </el-row>
                <el-divider />
              </div>
            </el-card>
          </el-row>
        </el-col>
        <el-col :span="12" class="margin-col-right">
          <el-row>
            <el-card>
              <span class="title">流程申请</span>
              <el-divider />
              <el-button>加班离职</el-button>
              <el-button>请假调休</el-button>
              <el-button>审批列表</el-button>
              <el-button>我的消息</el-button>
            </el-card>
          </el-row>
          <el-row>
            <el-card>
              <span class="title">绩效指数</span>
              <el-divider />
              <radar style="width: 600px;height:400px;" />
            </el-card>
          </el-row>
          <el-row>
            <el-card>
              <span class="title">帮助链接</span>
              <el-divider />
              <el-row type="flex">
                <el-button type="success" icon="el-icon-search">入门指南</el-button>
                <el-button type="warning" icon="el-icon-star-off">在线帮助手册</el-button>
                <el-button type="danger" icon="el-icon-message">联系技术支持</el-button>
              </el-row>
            </el-card>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import radar from './components/radar.vue'

export default {
  name: 'Dashboard',
  components: {
    radar
  },
  data() {
    return {
      url: this.$store.getters.userPicture,
      name: this.$store.getters.name,
      company: this.$store.getters.company,
      department: this.$store.getters.department
    }
  }
}
</script>

<style lang="scss">
.dashboard-container {
  .title {
    font-size: 24px;
    display: block;
  }
  .el-divider {
    margin: 15px 0;
  }
  .top-bar-right {
    margin-left: 20px;
    font-size: 20px;
    color: #7f8c8d;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    & :first-child {
      display: block;
      font-size: 24px;
      color: black;
      padding-bottom: 10px;
    }
  }
  .top-bar-left {
    height: 100px;
  }
  .margin-col-left {
    .el-row {
      margin-top: 15px;
    }
  }
  .margin-col-right {
    .el-row {
      margin: 15px 0 0 15px;
    }
  }
}
</style>
