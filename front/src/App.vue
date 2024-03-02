<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">개인 프로젝트 관리 도구</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
        aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
          </li>
          <!-- <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              View Type
            </a>
            <ul class="dropdown-menu">
              <li @click="changeViewType(1)"><a class="dropdown-item" href="#">Card</a></li>
              <li @click="changeViewType(2)"><a class="dropdown-item" href="#">List</a></li>
              <li @click="changeViewType(3)"><a class="dropdown-item" href="#">TimeLine</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" aria-disabled="true">Link</a>
          </li> -->
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
      <div style="margin-left:10px;" v-if="isLogin == false">
        <button type="button" class="btn btn-outline-secondary"><router-link to="/login">로그인</router-link></button>
        <button type="button" class="btn btn-outline-secondary" style="margin-left:5px;"><router-link
            to="/signup">회원가입</router-link></button>
      </div>
      <div style="margin-left: 10px" v-if="isLogin">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <button class="btn btn-outline-secondary">{{ this.$store.state.email }}</button>
          </a>
          <ul class="dropdown-menu">
            <li class="dropdown-item"><router-link to="/mypage">My Page</router-link></li>
            <li class="dropdown-divider"></li>
            <li class="dropdown-item">
              <button class="btn btn-danger" @click="logout">Logout</button>
            </li>
          </ul>
        </li>
      </div>
    </div>
    <div class="body">
    </div>
  </nav>
  <div class="mt-4">
    <!-- 라우터로 보여줄 곳 -->
    <router-view></router-view>
    <!-- <PostList :posts="posts"/> -->
  </div>
  <component :is="currentComponent"></component>
  <!-- <AppContainer /> -->
</template>

<script>
import AppContainer from "./components/AppConainer.vue"
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();
export default {
  name: 'App',
  data() {
    return {
      currentComponent: null,
    }
  },
  watch: {
    isLogin(newValue) {
      if (newValue) {
        this.currentComponent = AppContainer;
      } else {
        this.currentComponent = null;
      }
    },
  },
  components: {
    AppContainer,
  },
  created() {
    if (!this.isLogin && cookies.get("token")) {
      this.getUserMe();
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
  methods: {
    async getUserMe() {
      try {
        const response = await this.$axios.get(`${this.$store.state.host}/auth/me?token=${cookies.get("token")}`, {
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (response.status == 200) {
          // 조회 성공시 처리
          const userData = response.data;
          this.$store.dispatch('loadUser', userData.email);
        } else {
          alert("내 정보 조회에 실패했습니다. 다시 시도해주세요");
        }
      } catch (error) {
        console.log(error);
        alert('내 정보 조회 중 오류가 발생했습니다.');
        this.logout();
      }
    },
    logout() {
      this.$store.dispatch('logout');
    },
    changeViewType(viewType) {
      this.$store.dispatch('changeViewType', viewType);
    },
  }
}
</script>
<style>
.login {
  margin-left: 5px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.dropdown {
  list-style-type: none;
}

.dropdown-item {
  list-style-type: none;
  /* 목록 마커 숨김 */
}
</style>
