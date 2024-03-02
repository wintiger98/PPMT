<template>
  <div class="d-flex justify-content-center align-items-center flex-column">
    <ProjectCard v-if="viewType == 1" :projects="projects" @open:project="openProject"></ProjectCard>
    <ProjectList v-if="viewType == 2" :projects="projects" @open:project="openProject"></ProjectList>
    <ProjectTimeLine v-if="viewType == 3" :projects="projects" @open:project="openProject"></ProjectTimeLine>
    <br>
    <button @click="plusButtonEvent" type="button" class="btn">➕</button>
    <!-- <ProjectView :projectId="projectId" @project:finish="projectInit" /> -->
    <component :is="currentComponent" :projectId="projectId" @project:finish="projectInit" />
  </div>
</template>

<script>
import ProjectCard from "./ProjectCard.vue"
import ProjectList from "./ProjectList.vue"
import ProjectTimeLine from "./ProjectTimeLine.vue"
import ProjectView from "./ProjectView.vue"
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

export default {
  name: 'AppContainer',
  data() {
    return {
      projectId: 0,
      projects: [],
      currentComponent: null,
    }
  },
  created() {
    this.getProjects();
  },
  mounted() {
    this.getProjects();
  },
  methods: {
    async getProjects() {
      if (cookies.get('token')) {
        try {
          const response = await this.$axios.get(`${this.$store.state.host}/projects?token=${cookies.get('token')}`, {
            headers: {
              "Content-Type": "application/json",
            }
          });

          if (parseInt(response.status / 100) == 2) {
            // 생성 성공시 처리
            const userProjects = response.data;
            console.log(userProjects);
            this.projects = userProjects;
          } else {
            alert("프로젝트 조회에 실패했습니다. 다시 시도해주세요");
          }
        } catch (error) {
          console.log(error);
          alert("프로젝트 조회 중 오류가 발생했습니다");
        }
      }

    },
    plusButtonEvent() {
      this.openProjectModal();
      this.createProject();
    },
    async createProject() {
      try {
        const response = await this.$axios.post(`${this.$store.state.host}/projects?token=${cookies.get('token')}`, {
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (parseInt(response.status / 100) == 2) {
          // 생성 성공시 처리
          const newProject = response.data;
          console.log(newProject);
          this.projectId = newProject.id
        } else {
          alert("프로젝트 생성에 실패했습니다. 다시 시도해주세요");
        }
      } catch (error) {
        console.log(error);
        alert("프로젝트 생성 중 오류가 발생했습니다");
      }
    },
    openProjectModal() {
      if (!this.isLogin) {
        alert("로그인을 하십시오.");
        return
      }
      this.openProject(this.projectId);
    },
    projectInit() {
      this.projectId = 0;
      this.currentComponent = null; // 현재 컴포넌트 초기화
      this.getProjects();
    },
    openProject(projectId) {
      // ProjectView를 열 때 호출하는 메소드
      this.projectId = projectId;
      this.currentComponent = ProjectView; // ProjectView 컴포넌트를 할당
    },
  },
  components: {
    ProjectCard,
    ProjectList,
    ProjectTimeLine,
    ProjectView,
  },
  computed: {
    viewType() {
      return this.$store.state.viewType;
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
}
</script>

<style></style>