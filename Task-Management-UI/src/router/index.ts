import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../modules/dashboard/Dashboard.vue'
import ReportsView from '../modules/dashboard/ReportsView.vue'
import AnalyticsView from '../modules/dashboard/AnalyticsView.vue'
import GoalsView from '../modules/dashboard/GoalsView.vue'
import BoardPage from '../modules/tasks/views/List/pages/BoardPage.vue'
import CalendarPage from '../modules/tasks/views/List/pages/CalendarPage.vue'
import GanttPage from '../modules/tasks/views/List/pages/GanttPage.vue'
import InboxView from '../modules/tasks/views/List/InboxView.vue'
import FollowupsView from '../modules/tasks/views/List/FollowupsView.vue'
import MyTasksView from '../modules/tasks/views/List/MyTasksView.vue'
import Settings from '../modules/settings/SettingsView.vue'
import Home from '../modules/home/HomeView.vue'
import LoginView from '../modules/auth/views/loginView.vue'
import PlannerView from '../modules/planner/PlannerView.vue'
import CalendarView from '../modules/planner/CalendarView.vue'
import TimelineView from '../modules/planner/TimelineView.vue'
import TasksView from '../modules/planner/TasksView.vue'
import CompletedView from '../modules/planner/CompletedView.vue'
import TimeTrackingView from '../modules/time-tracking/TimeTrackingView.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/',
    component: Home,
    children: [
      { path: '', redirect: '/inbox', meta: { requireAuth: true } },
      { path: 'inbox', name: 'Inbox', component: InboxView, meta: { requireAuth: true } },
      { path: 'followups', name: 'Followups', component: FollowupsView, meta: { requireAuth: true } },
      { path: 'my-tasks', name: 'MyTasks', component: MyTasksView, meta: { requireAuth: true } },
      { path: 'board', component: BoardPage, meta: { requireAuth: true } },
      { path: 'dashboard', component: Dashboard, meta: { requireAuth: true } },
      { path: 'dashboard/reports', component: ReportsView, meta: { requireAuth: true } },
      { path: 'dashboard/analytics', component: AnalyticsView, meta: { requireAuth: true } },
      { path: 'dashboard/goals', component: GoalsView, meta: { requireAuth: true } },
      { path: 'calendar', component: CalendarPage, meta: { requireAuth: true } },
      { path: 'gantt', component: GanttPage, meta: { requireAuth: true } },
      {
        path: 'planner',
        component: PlannerView,
        meta: { requireAuth: true },
        children: [
          { path: '', redirect: '/planner/calendar' },
          { path: 'calendar', component: CalendarView, meta: { requireAuth: true } },
          { path: 'timeline', component: TimelineView, meta: { requireAuth: true } },
          { path: 'tasks', component: TasksView, meta: { requireAuth: true } },
          { path: 'completed', component: CompletedView, meta: { requireAuth: true } },
        ],
      },
      { path: 'time-tracking', component: TimeTrackingView, meta: { requireAuth: true } },
      { path: 'settings', component: Settings, meta: { requireAuth: true } },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  // Authentication disabled - skip login check
  next();
  
  // Original auth check (commented out):
  // const token = localStorage.getItem('token')
  // const expiry = Number(localStorage.getItem('token_expiry'))
  // if (to.matched.some(record => record.meta.requireAuth)) {
  //   if (!token || Date.now() > expiry) {
  //     next({ name: 'Login' })
  //   } else {
  //     next();
  //   }
  // } else {
  //   next();
  // }
})

export default router
