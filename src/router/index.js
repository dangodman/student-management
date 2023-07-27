import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/Login.vue'
// 学生
import Student from '@/components/student/Student.vue'
import Sinformation from '@/components/student/sinformation.vue'
import Updatesin from '@/components/student/updatesin.vue'
// 管理员
import Admin from '@/components/admin/Admin.vue'
import Astulist from '@/components/admin/Astulist.vue'
import Sgrade from '@/components/admin/Sgrade.vue'
import Course from '@/components/admin/Course.vue'
import Sedit from '@/components/admin/Sedit.vue'
import Addstulist from '@/components/admin/Addstulist.vue'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', meta: { title: '登录页' }, component: Login },
    {
      path: '/student', name: 'student', meta: { title: '学生学籍信息页' }, component: Student,
      children: [
        { path: '/', redirect: '/student/sinformation' },
        { path: 'sinformation', component: Sinformation },
        {path:'course',component:Course,meta:{keeplive:true}},
        {path:'Updatesin',component:Updatesin,meta:{keepAlive:true}}
      ]
    },
    {path:'/admin',name:'admin',meta:{title:'管理信息页'},component:Admin,children:[
      {path:'/',redirect:'/admin/astulist'},
      {path:'astulist',component:Astulist,meta:{keepAlive:true}},
      {path:'sgrade',component:Sgrade,meta:{keepAlive:true}},
      {path:'course',component:Course,meta:{keepAlive:true}},
      {path:'sedit',component:Sedit,meta:{keepAlive:true}},
      {path:'addstulist',component:Addstulist,meta:{keepAlive:true}}
      
    ]}
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.path === '/login') {
    return next()
  }
  return next()
})
export default router