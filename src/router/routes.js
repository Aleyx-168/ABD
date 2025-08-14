import MainLayout from 'layouts/MainLayout.vue'
import IndexPage from 'pages/IndexPage.vue'
import ScanPage from 'pages/ScanPage.vue'
import EmptyPage from 'pages/EmptyPage.vue'
import ErrorNotFound from 'pages/ErrorNotFound.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: IndexPage },
      { path: 'scan', component: ScanPage },
      { path: 'empty', component: EmptyPage },
    ],
  },
  { path: '/:catchAll(.*)*', component: ErrorNotFound },
]

export default routes
