import { createWebHistory, createRouter } from "vue-router";
import MemberLogin from "./components/member/MemberLogin.vue";
import MemberSignup from "./components/member/MemberSignup.vue";
import MemberMypage from "./components/member/MemberMypage.vue";
import ProjectView from "./components/ProjectView.vue";

const routes = [
  {
    path: "/login",
    component: MemberLogin,
  },
  {
    path: "/signup",
    component: MemberSignup,
  },
  {
    path: "/mypage",
    component: MemberMypage,
  },
  {
    path: "/project",
    component: ProjectView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
