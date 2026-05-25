import Vue from "vue";
import Router from "vue-router";
import Login from "@/view/Login.vue";
// 学生
import Student from "@/components/student/Student.vue";
import Sinformation from "@/components/student/sinformation.vue";
import Updatesin from "@/components/student/updatesin.vue";
// 管理员
import Admin from "@/components/admin/Admin.vue";
import Astulist from "@/components/admin/Astulist.vue";
import Sgrade from "@/components/admin/Sgrade.vue";
import Course from "@/components/admin/Course.vue";
import Sedit from "@/components/admin/Sedit.vue";
import Addstulist from "@/components/admin/Addstulist.vue";
Vue.use(Router);
const router = new Router({
  mode: "history",
  routes: [
    { path: "/", redirect: "/login" },
    {
      path: "/login",
      name: "login",
      meta: { title: "登录页" },
      component: Login,
    },
    {
      path: "/student",
      name: "student",
      meta: { title: "学生学籍信息页" },
      component: Student,
      children: [
        { path: "/", redirect: "/student/sinformation" },
        { path: "sinformation", component: Sinformation },
        { path: "course", component: Course, meta: { keeplive: true } },
        { path: "Updatesin", component: Updatesin, meta: { keepAlive: true } },
      ],
    },
    {
      path: "/admin",
      name: "admin",
      meta: { title: "管理信息页" },
      component: Admin,
      children: [
        { path: "/", redirect: "/admin/astulist" },
        { path: "astulist", component: Astulist, meta: { keepAlive: true } },
        { path: "sgrade", component: Sgrade, meta: { keepAlive: true } },
        { path: "course", component: Course, meta: { keepAlive: true } },
        { path: "sedit", component: Sedit, meta: { keepAlive: true } },
        {
          path: "addstulist",
          component: Addstulist,
          meta: { keepAlive: true },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  // 登录页直接放行
  if (to.path === "/login") {
    // 已登录用户访问登录页时，重定向到对应首页
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");
    if (token && role) {
      return next(role === "admin" ? "/admin" : "/student");
    }
    return next();
  }

  // 其他页面需要验证登录状态
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  if (!token) {
    return next("/login");
  }

  // 验证角色权限：学生不能访问管理员页面，反之亦然
  if (to.path.startsWith("/admin") && role !== "admin") {
    return next("/student");
  }
  if (to.path.startsWith("/student") && role !== "student") {
    return next("/admin");
  }

  next();
});

export default router;