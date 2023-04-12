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
          />
        </div>
        <!-- 分割线 -->
        <el-divider />
        <!-- 主要内容 -->
        <div class="main">
          <el-tree
            :data="data"
            :props="defaultProps"
            :default-expand-all="true"
          >
            <tree
              slot-scope="{ data }"
              :tree-node="data"
              :dropdown-list="mainList"
              @reloadPage="reloadPage"
            />
          </el-tree>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import tree from './components/tree.vue'
import { getDepartmentList } from '@/api/departments'
export default {
  components: {
    tree
  },
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      headerTreeNode: {
        name: '',
        manager: '负责人'
      },
      headerList: [{ id: 1, name: '添加子部门' }],
      mainList: [{ id: 1, name: '添加子部门' }, { id: 2, name: '查看部门' }, { id: 3, name: '删除部门' }]
    }
  },
  created() {
    this.getDepartmentList()
  },
  methods: {
    async getDepartmentList() {
      const data = await getDepartmentList()
      this.headerTreeNode.name = data.companyName
      const result = data.depts
      // 将数组数据转化为树形结构
      for (let i = 0; i < result.length; i++) {
        const item = result[i]
        // 查找result里的对象的id是否等于循环中的对象的pid？
        const parent = result.find(e => e.id === item.pid)
        // 如果相等
        if (parent) {
          // 如果parent对象里没有children数组
          if (!parent.children) {
            // 创建一个children数组
            parent.children = []
          }
          // 如果parent对象里已经有children数组
          // 那么直接push
          parent.children.push(item)
        } else {
          // 如果不相等，把item添加到新数组里
          this.data.push(item)
        }
      }
    },
    reloadPage() {
      console.log(111111111)
      this.getDepartmentList()
    }
  }
}
</script>

<style lang="scss">
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
</style>
