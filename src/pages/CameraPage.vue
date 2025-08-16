<template>
  <q-page class="flex flex-center column bg-black">
    <!-- 视频预览 -->
    <video ref="videoRef" autoplay playsinline muted class="w-full h-auto"></video>

    <!-- 错误提示 -->
    <div v-if="errorMsg" class="text-red q-mt-md">
      {{ errorMsg }}
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const videoRef = ref(null)
const errorMsg = ref('')
let stream = null

onMounted(async () => {
  try {
    // 请求后置摄像头
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { exact: 'environment' } },
      audio: false,
    })

    if (videoRef.value) {
      videoRef.value.srcObject = stream
    }
  } catch (err) {
    console.error('摄像头错误:', err)
    errorMsg.value = '无法打开后置摄像头，请检查权限或设备兼容性'
  }
})

onBeforeUnmount(() => {
  // 页面退出时关闭摄像头
  if (stream) {
    stream.getTracks().forEach((track) => track.stop())
  }
})
</script>
