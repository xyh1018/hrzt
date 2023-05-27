import Layout from '@/layout'

export default {
  path: '/social',
  name: 'social_securitys',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/social'),
      meta: {
        title: '社保',
        icon: 'table'
      }
    },
    {
      path: 'historicalArchiving',
      component: () => import('@/views/social/components/history-archiving.vue'),
      meta: {
        title: '历史存档'
      },
      hidden: true
    }
  ]
}
