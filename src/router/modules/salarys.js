import Layout from '@/layout'

export default {
  path: '/salarys',
  name: 'salarys',
  component: Layout,
  children: [
    {
      path: '',
      name: 'salarys',
      component: () => import('@/views/salarys'),
      meta: {
        title: '工资',
        icon: 'money'
      }
    },
    {
      path: 'detail/:id',
      component: () => import('@/views/salarys/components/salary-detail.vue'),
      meta: {
        title: '工资详情'
      },
      hidden: true
    }
  ]
}
