<template>
  <div ref="radarContainer" />
</template>

<script>
const echarts = require('echarts')
export default {
  mounted() {
    const myChart = echarts.init(this.$refs.radarContainer)
    myChart.setOption({
      radar: {
        shape: 'circle',
        indicator: [
          { name: '考勤', max: 100 },
          { name: '工资', max: 100 },
          { name: '社保', max: 100 },
          { name: '工作效率', max: 100 },
          { name: '知识分享', max: 100 },
          { name: '代码行数', max: 100 }
        ]
      },
      series: [
        {
          name: '绩效指数',
          type: 'radar',
          data: [
            {
              value: [80, 90, 100, 40, 90, 45],
              name: 'Allocated Budget'
            },
            {
              value: [100, 89, 77, 99, 32, 65],
              name: 'Actual Spending'
            }
          ]
        }
      ]
    })
  }
}
</script>

<style>

</style>
