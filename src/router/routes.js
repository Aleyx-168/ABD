const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'), // 动态导入 MainLayout
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }, // 首页
      { path: 'scan', component: () => import('pages/ScanPage.vue') }, // 扫描页
      { path: 'empty', component: () => import('pages/EmptyPage.vue') }, // 空白页
      {
        path: 'camera',
        name: 'camera',
        component: () => import('pages/CameraPage.vue'), // ✅ 后置摄像头页面
      },
    ],
  },

  // 始终放最后的 404 页面
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
