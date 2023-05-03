<template>
  <div>
    <el-upload
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :http-request="upload"
      list-type="picture-card"
      action="#"
      :limit="1"
      :class="{ disabled: fileComputed }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress
      v-if="showLoding"
      :show-text="false"
      :stroke-width="5"
      :percentage="percent"
      style="width: 148px; margin-top: 5px"
    />
    <el-dialog
      title="图片"
      :visible.sync="showDialog"
    >
      <img
        :src="imgUrl"
        style="width: 100%"
        alt=""
      >
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDc8RWMJ2XnpdDcn6LPFXbT9bpriLo5B4n',
  SecretKey: 'gCVQAh292iAOgleNbeYFix3wb2GG4f3C'
})
export default {
  data() {
    return {
      fileList: [], // 图片地址设置为数组
      showDialog: false, // 控制显示弹层
      imgUrl: '',
      currentUid: '',
      showLoding: false,
      percent: 0
    }
  },
  computed: {
    // 设定一个计算属性 判断是否已经上传完了一张
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    // 预览
    preview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    // 删除
    // file是要删除的file对象，fileList是删除后的文件数组
    handleRemove(file) {
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid)
    },
    // 文件改变时
    // file是当前的文件，fileList是当前的最新数组
    changeFile(file, fileList) {
      this.fileList = fileList.map((item) => item)
    },
    // 图片上传之前
    beforeUpload(file) {
      // 要开始做文件上传的检查了
      // 文件类型 文件大小
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      //  检查大小
      const maxSize = 15 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过15M')
        return false
      }
      this.currentUid = file.uid
      this.showLoding = true
      return true
    },
    // 上传
    upload(params) {
      if (params.file) {
        // 执行上传操作
        cos.putObject(
          {
            Bucket: 'xyh-1314748094', // 存储桶
            Region: 'ap-nanjing', // 地域
            Key: params.file.name, // 文件名
            Body: params.file, // 要上传的文件对象
            StorageClass: 'STANDARD', // 上传的模式类型 直接默认 标准模式即可
            onProgress: (params) => { // 上传进度
              this.percent = params.percent * 100
            }
          },
          (err, data) => {
            if (!err && data.statusCode === 200) {
              this.fileList = this.fileList.map((item) => {
                if (item.uid === this.currentUid) {
                  return { url: 'http://' + data.Location, upload: true }
                }
                return item
              })
            }
            setTimeout(() => {
              this.showLoding = false
              this.percent = 0
            }, 2000)
          }
        )
      }
    }
  }
}
</script>

<style lang="scss">
.disabled .el-upload--picture-card {
  display: none;
}
.el-dialog__header {
  padding: 10px;
}
</style>
