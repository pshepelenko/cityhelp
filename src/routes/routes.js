import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import AuthLayout from '@/views/Pages/AuthLayout.vue';
import Login from '@/views/Pages/Login.vue'
import NotFound from '@/views/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    redirect: 'login',
    component: DashboardLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "demo" */ '../views/Dashboard.vue')
      },
      {
        path: '/icons',
        name: 'icons',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Icons.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/UserProfile.vue')
      },
      {
        path: '/maps',
        name: 'maps',
        component: () => import(/* webpackChunkName: "demo" */ '../views/GoogleMaps.vue')
      },
      {
        path: '/tables',
        name: 'tables',
        component: () => import(/* webpackChunkName: "demo" */ '../views/RegularTables.vue')
      },
      {
        path: '/admin/tasks',
        name: 'Задания',
        component: () => import(/* webpackChunkName: "demo" */ '../views/admin/Tasks.vue'),
        meta: {
          admin: true,
          requiresAuth: true
        }
      },
      {
        path: '/admin/tasks/:id',
        name: 'Детали задания',
        component: () => import(/* webpackChunkName: "demo" */ '../views/admin/TaskPage.vue'),
        meta: {
          admin: true,
          requiresAuth: true
        }
      },
      {
        path: '/admin/task/create',
        name: 'Создать новое задание',
        component: () => import(/* webpackChunkName: "demo" */ '../views/admin/TaskCreate.vue'),
        meta: {
          admin: true,
          requiresAuth: true
        }
      },
      {
        path: '/admin/reports',
        name: 'Отчеты',
        component: () => import(/* webpackChunkName: "demo" */ '../views/admin/Reports.vue'),
        meta: {
          admin: true,
          requiresAuth: true
        }
      },
      {
        path: '/admin/reports/:id',
        name: 'Отчет по выполнению задания',
        component: () => import(/* webpackChunkName: "demo" */ '../views/admin/ReportPage.vue'),
        meta: {
          admin: true,
          requiresAuth: true
        }
      },
      {
        path: '/admin/rewards',
        name: 'Награды',
        component: () => import(/* webpackChunkName: "demo" */ '../views/admin/Rewards.vue'),
        meta: {
          admin: true,
          requiresAuth: true
        }
      },
      {
        path: '/admin/rewards/:id',
        name: 'Информация о награде',
        component: () => import(/* webpackChunkName: "demo" */ '../views/admin/RewardPage.vue'),
        meta: {
          admin: true,
          requiresAuth: true
        }
      },
      {
        path: '/admin/reward/create',
        name: 'Создать награду',
        component: () => import(/* webpackChunkName: "demo" */ '../views/admin/RewardCreate.vue'),
        meta: {
          admin: true,
          requiresAuth: true
        }
      },
      {
        path: '/tasks',
        name: 'Задания',
        component: () => import(/* webpackChunkName: "demo" */ '../views/public/PublicTasks'),
        meta: {
          admin: false,
          requiresAuth: true
        }
      },
      {
        path: '/tasks/:id',
        name: 'Детали задания',
        component: () => import(/* webpackChunkName: "demo" */ '../views/public/PublicTaskPage'),
        meta: {
          admin: false,
          requiresAuth: true
        }
      },
      {
        path: '/reports',
        name: 'Отправленные отчеты',
        component: () => import(/* webpackChunkName: "demo" */ '../views/public/PublicReports.vue'),
        meta: {
          admin: false,
          requiresAuth: true
        }
      },
      {
        path: '/reports/:id',
        name: 'Отчет по выполнению задания',
        component: () => import(/* webpackChunkName: "demo" */ '../views/public/PublicReportPage.vue'),
        meta: {
          admin: false,
          requiresAuth: true
        }
      },
      {
        path: '/rewards',
        name: 'Награды',
        component: () => import(/* webpackChunkName: "demo" */ '../views/public/PublicRewards.vue'),
        meta: {
          admin: false,
          requiresAuth: true
        }
      },
      {
        path: '/rewards/:id',
        name: 'Информация о награде',
        component: () => import(/* webpackChunkName: "demo" */ '../views/public/PublicRewardPage.vue'),
        meta: {
          admin: false,
          requiresAuth: true
        }
      },
      {
        path: '/report/create',
        name: 'Создание отчета',
        component: () => import(/* webpackChunkName: "demo" */ '../views/public/PublicReportCreate.vue'),
        meta: {
          admin: false,
          requiresAuth: true
        }
      },
    ]
  },
  {
    path: '/',
    redirect: 'login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Login.vue'),
        meta: {
          admin: false,
          requiresAuth: false
        }
      }, 
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Register.vue'),
        meta: {
          admin: false,
          requiresAuth: false
        }
      },     
      { path: '*', component: NotFound },
      
    ]
  }
];

export default routes;
