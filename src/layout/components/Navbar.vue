<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <div class="app-breadcrumb">人力资源管理平台</div>

    <div class="right-menu">
      <screenFull class="right-menu-item" />
      <el-dropdown
        class="avatar-container"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img
            v-imageError="defaultImgSrc"
            :src="userPicture"
            class="user-avatar"
          >
          <span class="name">{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu
          slot="dropdown"
          class="user-dropdown"
        >
          <router-link to="/">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>
          <a
            target="_blank"
            href="https://github.com/xyh1018/hrzt"
          >
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <el-dropdown-item
            divided
            @click.native="logout"
          >
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import screenFull from './screen-full.vue'

export default {
  components: {
    Hamburger,
    screenFull
  },
  data() {
    return {
      // 默认用户头像
      defaultImgSrc: require('@/assets/common/head.jpg')
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'name', 'userPicture'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      this.$store.dispatch('user/logout') // 删除用户token和用户资料
      this.$router.push('/login') // 定向到登陆页
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: -webkit-linear-gradient(bottom, #3d6df8, #5b8cff);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .app-breadcrumb {
    display: inline-block;
    font-size: 18px;
    line-height: 50px;
    margin-left: 10px;
    color: #ffffff;
    cursor: text;
  }
  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
          color: #fff;
        }
        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 15px;
          vertical-align: middle;
        }
        .name {
          color: #fff;
          vertical-align: middle;
          margin-left: 5px;
        }
      }
      .user-dropdown {
        color: #fff;
      }
    }
  }
  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #ffffff;
    vertical-align: middle;
  }
}
</style>
