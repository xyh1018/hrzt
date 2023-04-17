<!-- eslint-disable vue/no-template-shadow -->
<template>
  <div class="departments-container">
    <div class="app-container">
      <el-card class="card">
        <!-- 头部区域 -->
        <div class="header">
          <tree
            :tree-node="headerTreeNode"
            :dropdown-list="headerList"
            @isShow="show"
          />
        </div>
        <!-- 分割线 -->
        <el-divider />
        <!-- 主要内容 -->
        <div class="main">
          <el-tree
            :data="treeData"
            :props="defaultProps"
            :default-expand-all="true"
          >
            <tree
              slot-scope="{ data }"
              :tree-node="data"
              :dropdown-list="mainList"
              @reloadPage="reloadPage"
              @isShow="show"
              @isShowEdit="isShowEdit"
            />
          </el-tree>
        </div>
      </el-card>
    </div>
    <add-dept
      ref="dept"
      :is-show.sync="isShow"
      :options="options"
      :current-tree-node="currentTreeNode"
      @cancelShow="isShow = false"
      @reloadPage="reloadPage"
    />
  </div>
</template>

<script>
import tree from './components/tree.vue'
import addDept from './components/add-dept.vue'
import { getDepartmentList } from '@/api/departments'
import { Message } from 'element-ui'
import { arrayToTree } from '@/utils/index'

export default {
  components: {
    tree,
    addDept
  },
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      headerTreeNode: {
        name: '',
        manager: '负责人',
        id: ''
      },
      headerList: [{ id: 1, name: '添加子部门' }],
      mainList: [
        { id: 1, name: '添加子部门' },
        { id: 2, name: '编辑部门' },
        { id: 3, name: '删除部门' }
      ],
      isShow: false, // 是否展示弹层
      options: [], // 管理员选项
      currentTreeNode: {} // 当前点击节点的数据
    }
  },
  created() {
    this.getDepartmentList()
  },
  methods: {
    // 获取公司列表函数
    async getDepartmentList() {
      const data = await getDepartmentList()
      this.headerTreeNode.name = data.companyName
      const result = data.depts
      // 获取管理员列表
      result.forEach((obj) => {
        if (obj.manager) {
          if (!this.options.includes(obj.manager)) {
            this.options.push(obj.manager)
          }
        }
      })
      // 将数组数据转化为树形结构
      this.treeData = arrayToTree(result)
    },
    // 重新加载公司列表数据
    reloadPage(message) {
      this.isShow = false
      this.getDepartmentList()
      Message({
        message,
        type: 'success'
      })
    },
    show(currentTreeNode) {
      this.isShow = true
      this.currentTreeNode = currentTreeNode
    },
    isShowEdit(currentTreeNode) {
      this.isShow = !this.isShow
      this.currentTreeNode = currentTreeNode
      this.$refs.dept.getDeptsDetail(currentTreeNode.id)
    }
  }
}
</script>

<style lang="scss">
.departments-container {
  .card {
    .main {
      .companyName {
        font-weight: normal;
      }
      .card-row {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 3px;
      }
    }
  }
  .form {
    font-weight: normal;
  }
}
</style>
