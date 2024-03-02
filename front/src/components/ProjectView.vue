<template>
    <div class="modal" style="display: flex">
        <div class="modal-content">
            <Title :title="projectData.title || '프로젝트 제목'" @update:title="updateProject"></Title>
            <Description :description="projectData.description || '프로젝트 설명'" @update:description="updateProject">
            </Description>
            <Duration :startAt="projectData.start_at" :endAt="projectData.end_at" @update:endAt="updateProject"
                @update:startAt="updateProject">
            </Duration>
            <Category :categories="projectData.categories" @update:categories="updateProject"></Category>
            <Tech :tech="projectData.tech" @update:tech="updateProject"></Tech>

            <div v-for="content in projectData.project_contents" :key="content">
                <ProjectContent :projectContent="content"></ProjectContent>
            </div>

            <button @click="showModal = true" class="styled-button">내용 추가</button>
            <ProjectContentModal :showModal="showModal" @close="showModal = false" @save="saveProjectContent">
            </ProjectContentModal>

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModal">닫기</button>
                <button type="button" class="btn btn-primary" @click="saveProject">저장</button>
                <button type="button" class="btn btn-danger" @click="deleteProject">삭제</button>
            </div>
        </div>
    </div>
</template>

<script>
import Title from "./project/ProjectTitle.vue";
import Description from "./project/ProjectDescription.vue";
import Category from "./project/ProjectCategory.vue";
import Duration from "./project/ProjectDuration.vue";
import Tech from "./project/ProjectTech.vue";
import ProjectContentModal from "./ProjectContentModal.vue";
import ProjectContent from "./project/ProjectContent.vue";

export default {
    name: "ProjectView",
    data() {
        return {
            projectData: { "project_contents": [] },
            showModal: false,
        }
    },
    props: {
        projectId: {
            type: Number,
            required: true,
        },
    },
    created() {
        if (this.projectId > 0) {
            this.getProject();
        }
    },
    watch: {
        projectId(newProjectId) {
            console.log("ProjectView created with projectId:", newProjectId);
            if (newProjectId > 0) {
                this.getProject();
            }
        }
    },
    computed: {
        isModal() {
            return this.$store.state.isModal;
        },
    },
    components: {
        Title,
        Description,
        Category,
        Duration,
        Tech,
        ProjectContentModal,
        ProjectContent,
    },
    methods: {
        async getProject() {
            try {
                const response = await this.$axios.get(`${this.$store.state.host}/projects/${this.projectId}`, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if (response.status == 200) {
                    // 조회 성공시 처리
                    const projectData = response.data;
                    console.log(projectData);
                    this.projectData = projectData;
                } else {
                    alert("프로젝트 조회에 실패했습니다. 다시 시도해주세요");
                }
            } catch (error) {
                console.log(error);
                alert('프로젝트 조회 중 오류가 발생했습니다.');
            }
        },
        closeModal() {
            // 모달을 닫는 메소드
            this.$store.dispatch("closeModal");
            this.$emit('project:finish');
            this.projectData = {};
        },
        async saveProject() {
            // 프로젝트 저장 메소드
            try {
                const response = await this.$axios.put(`${this.$store.state.host}/projects/${this.projectId}`, this.projectData, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if (response.status == 200) {
                    // 생성 성공시 처리
                    const newProject = response.data;
                    console.log(newProject);
                    this.closeModal();
                } else {
                    alert("프로젝트 저장에 실패했습니다. 다시 시도해주세요");
                }
            } catch (error) {
                console.log(error);
                alert('프로젝트 저장 중 오류가 발생했습니다.');
            }
        },
        updateProject(data) {
            this.projectData[data.key] = data.value;
        },
        async deleteProject() {
            try {
                const response = await this.$axios.delete(`${this.$store.state.host}/projects/${this.projectId}`, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if (response.status == 200) {
                    // 삭제 성공시 처리
                    const newProject = response.data;
                    console.log(newProject);
                    this.closeModal();
                } else {
                    alert("프로젝트 삭제에 실패했습니다. 다시 시도해주세요");
                }
            } catch (error) {
                console.log(error);
                alert('프로젝트 삭제 중 오류가 발생했습니다.');
            }
        },
        saveProjectContent(data) {
            this.projectData["project_contents"].push(data);
        },
    }
}
</script>

<style>
/* 모달 스타일 */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* 배경을 반투명하게 설정 */
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    padding: 2.5%;
    margin: 30%;
    border-radius: 5px;
}

/* form-group 스타일링 */
.form-group {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* 요소들을 세로 중앙 정렬 */
}

/* 입력 필드 스타일링 */
input[type="text"],
textarea {
    width: 50%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
}

/* 입력 필드 스타일링 */
input[type="date"] {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
}

/* 레이블 스타일링 */
label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;

}


/* 닫기 버튼 스타일링 */
.close {
    background-color: red;
}

.create {
    background-color: blue;
}

.stack {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
}

.stack-item {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 2px 10px;
    margin-right: 5px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
}

.stack-item button {
    margin-left: 10px;
    cursor: pointer;
}

.stack-input {
    display: flex;
}

.stack-input input {
    margin-right: 5px;
    flex-grow: 1;
    /* 입력 필드 오른쪽에 여백 추가 */
}

.delete {
    border-color: transparent;
    color: red;
}

.add {
    border-color: transparent;
}

.styled-button {
    background-color: #4CAF50;
    /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
}
</style>
  