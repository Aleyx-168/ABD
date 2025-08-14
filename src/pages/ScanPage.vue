<template>
  <!-- 整个页面容器 -->
  <q-page class="column" style="background-color: black; padding: 10px">
    <!-- 上半部分：扫描框（紧贴屏幕顶部） -->
    <div class="scan-container">
      <!-- 摄像头画面 -->
      <video ref="videoRef" class="scan-video"></video>
      <!-- 扫描红线动画 -->
      <div class="scan-line"></div>
    </div>

    <!-- 下半部分：显示扫码结果 -->
    <div class="result-container">
      <div class="result-title">扫描结果：</div>
      <div class="result-text">
        {{ scanResult || '请将二维码放入上方扫描框中' }}
      </div>
    </div>
  </q-page>
</template>

<script setup>
// 引入二维码扫描库
import { BrowserQRCodeReader } from '@zxing/browser'
// Vue 组合式 API
import { onMounted, ref, onBeforeUnmount } from 'vue'
// 路由
import { useRoute, useRouter } from 'vue-router'

// 路由实例
const route = useRoute()
const router = useRouter()

// video 标签引用，用来播放摄像头画面
const videoRef = ref(null)
// 保存扫描结果
const scanResult = ref('')
// 保存扫码实例
let codeReader = null

// 从首页按钮传过来的标识（比如 "single-in"）
const source = route.query.source || ''

// 页面加载完成后执行
onMounted(async () => {
  console.log('扫码来源:', source)

  // 如果没有入口参数，直接回首页
  if (!source) {
    alert('无效入口，返回首页')
    router.push('/')
    return
  }

  // 初始化扫码器
  codeReader = new BrowserQRCodeReader()

  // 获取可用摄像头
  const devices = await BrowserQRCodeReader.listVideoInputDevices()

  if (devices.length > 0) {
    const firstDeviceId = devices[0].deviceId

    // 从摄像头实时解码
    codeReader.decodeFromVideoDevice(firstDeviceId, videoRef.value, (result) => {
      if (result) {
        scanResult.value = result.getText() // 保存结果
        console.log(`来源: ${source}, 扫描结果: ${scanResult.value}`)
      }
    })
  } else {
    alert('未检测到摄像头')
  }
})

// 页面离开时释放摄像头资源
onBeforeUnmount(() => {
  if (codeReader) {
    codeReader.reset()
  }
})
</script>

<style scoped>
/* 扫描框容器（紧贴顶部） */
.scan-container {
  position: relative;
  width: 100%;
  height: 30vh; /* 占页面上半部分 */
  border: 2px solid #00ff00;
  overflow: hidden;
}

/* 摄像头视频画面 */
.scan-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 红色扫描线动画 */
.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: red;
  animation: scanMove 2s ease-in-out infinite alternate;
}

/* 扫描线移动动画 */
@keyframes scanMove {
  0% {
    top: 0;
  }
  100% {
    top: calc(100% - 3px);
  }
}

/* 扫描结果显示区域 */
.result-container {
  margin-top: 10px;
  background-color: white;
  color: black;
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
}

.result-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.result-text {
  font-size: 16px;
  word-break: break-all; /* 长内容换行 */
}
</style>
