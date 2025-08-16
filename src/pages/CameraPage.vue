<template>
  <q-page class="flex flex-center column bg-black">
    <!-- 摄像头画面 -->
    <video ref="videoRef" autoplay playsinline class="w-full h-full object-cover"></video>
  </q-page>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'

const videoRef = ref(null)
let stream = null

onMounted(async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' } }, // ✅ 默认后置摄像头
      audio: false,
    })
    if (videoRef.value) {
      videoRef.value.srcObject = stream
    }
  } catch (err) {
    console.error('摄像头调用失败:', err)
  }
})

// 离开页面时关闭摄像头
onBeforeUnmount(() => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop())
  }
})
</script>

<style scoped>
video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
