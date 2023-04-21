<template>
  <!-- 顶部工具条 -->
  <el-card class="page-tools">
    <el-row
      type="flex"
      justify="space-between"
      align="middle"
    >
      <el-col>
        <div
          v-if="showLeft"
          class="left"
        >
          <i class="el-icon-info" />
          <slot name="left" />
        </div>
      </el-col>
      <el-col>
        <el-row
          type="flex"
          justify="end"
          class="right"
        >
          <slot name="right" />
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: {
    showLeft: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.page-tools {
  margin-bottom: 10px;
  .el-card__body {
    padding: 15px;
  }
  .left {
    line-height: 30px;
    i {
      margin-right: 5px;
      color: #409eff;
    }
    display: inline-block;
    padding: 0px 10px;
    border-radius: 3px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
  }
}
</style>
