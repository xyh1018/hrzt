<template>
  <div class="app-container">
    <div class="dashboard-container">
      <el-row>
        <el-card>
          <el-row>
            <div class="top-bar-left">
              <el-image
                style="width: 100px; height: 100px; border-radius: 50%"
                :src="url"
                :fit="cover"
              />
            </div>
            <div class="top-bar-right">
              <span class="right-span">早安，{{ name }}，祝你开心每一天！</span>
              <span>{{ name }} | {{ company }} - {{ department }}</span>
            </div>
          </el-row>
        </el-card>
      </el-row>
      <el-row type="flex">
        <el-col class="margin-col-left">
          <el-row>
            <el-card>
              <span class="title">工作日历</span>
              <el-divider />
              <el-calendar v-model="value" />
            </el-card>
          </el-row>
          <el-row>
            <el-card>
              <span class="title">公告</span>
              <el-divider />
            </el-card>
          </el-row>
        </el-col>
        <el-col class="margin-col-right">
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
              <div id="charts-container" style="width: 600px;height:400px;" />
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
import echarts from 'echarts'

export default {
  name: 'Dashboard',
  data() {
    return {
      url: this.$store.getters.userPicture,
      name: this.$store.getters.name,
      company: this.$store.getters.company,
      department: this.$store.getters.department
    }
  },
  mounted() {
    const chartContainer = document.getElementById('charts-container')
    const myChart = echarts.init(chartContainer)

    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    })
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
    display: inline-block;
    margin-left: 20px;
    font-size: 20px;
    color: #7f8c8d;
    height: 100%;
    & :first-child {
      display: block;
      font-size: 24px;
      color: black;
      padding-bottom: 10px;
    }
  }
  .top-bar-left {
    display: inline-block;
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
