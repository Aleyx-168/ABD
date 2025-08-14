<template>
  <q-page class="bg-grey-2">
    <!-- 顶部标题 -->
    <div
      class="text-center text-h6 bg-primary text-white"
      style="width: 100%; height: 5vh; line-height: 5vh; font-size: 22px"
    >
      仓库管理系统
    </div>

    <!-- 顶部 4 个按钮 -->
    <div class="row justify-between" style="padding: 2%">
      <q-btn label="客户" color="primary" size="lg" style="width: 22%; height: 7vh" />
      <q-btn label="供应商" color="secondary" size="lg" style="width: 22%; height: 7vh" />
      <q-btn label="设置" color="purple" size="lg" style="width: 22%; height: 7vh" />
      <q-btn label="位置" color="positive" size="lg" style="width: 22%; height: 7vh" />
    </div>

    <!-- 中间两列 8 个按钮 -->
    <div class="row justify-between" style="padding: 2%">
      <q-btn label="特价商品" color="primary" size="lg" style="width: 47%; height: 13vh" />
      <q-btn label="将要到的货柜单" color="positive" size="lg" style="width: 47%; height: 13vh" />
    </div>
    <div class="row justify-between" style="padding: 2%">
      <q-btn label="全部的货" color="purple" size="lg" style="width: 47%; height: 13vh" />
      <q-btn label="近20条记录" color="negative" size="lg" style="width: 47%; height: 13vh" />
    </div>

    <div class="row justify-between" style="padding: 2%">
      <q-btn
        label="批量入库"
        color="purple"
        size="lg"
        style="width: 47%; height: 13vh"
        @click="goScan('single-in')"
      />
      <q-btn
        label="批量出库"
        color="orange"
        size="lg"
        style="width: 47%; height: 13vh"
        @click="goScan('single-in')"
      />
    </div>
    <div class="row justify-between" style="padding: 2%">
      <q-btn
        label="单个入库"
        color="secondary"
        size="lg"
        style="width: 47%; height: 13vh"
        @click="goScan('single-in')"
      />
      <q-btn
        label="单个出库"
        color="pink"
        size="lg"
        style="width: 47%; height: 13vh"
        @click="goScan('single-in')"
      />
    </div>

    <!-- 底部扫码框 -->
    <div class="row justify-between" style="padding: 2%">
      <q-input outlined placeholder="扫码..." style="width: 70%; height: 7vh" />
      <q-btn icon="qr_code_scanner" color="primary" size="lg" style="width: 26%; height: 7vh" />
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router' // 先引入 Vue Router
const router = useRouter()

// 跳转到扫码页面，并带上来源标识
function goScan(code) {
  router.push(`/scan?source=${code}`)
}
</script>
