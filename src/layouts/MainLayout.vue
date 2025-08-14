<template>
  <q-layout view="lHh Lpr lFf">
    <!-- 顶部 -->
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>仓库管理系统</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- 页面容器 -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- 底部 -->
  </q-layout>
</template>

<script setup></script>
