<template>
    <div class="container" style="max-width:fit-content">
        <div class="row mt-3" v-for="(projectPair, i) in projectPairs" :key="i">
            <div class="col-md-6" v-for="(project, j) in projectPair" :key="j">
                <div class="card" style="width: 18rem;" v-if="project" @click="openProject(project.id)">
                    <div class="thumbnail">
                        <img v-if="checkHasImage(project)" class="image card-img-top" :src="getImageUrl(project)" alt="">
                        <img v-else class="image card-img-top" src="../assets/image/default_card_thumbnail.png"
                            alt="Card image cap">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{ project.title || `프로젝트${(i + 1) * 2 + j + 1}` }}</h5>
                        <small style="color:silver">last updated</small>
                        <br>
                        <small>
                            {{ dateFormat(new Date(project.updated_at)) }}
                        </small>
                        <br>
                        <p class="card-text">{{ project.description || '설명이 필요합니다' }}</p>
                        <br>
                    </div>
                    <ProgressBar :bgcolor="getBgColor(project)" :completed="calcCompleted(project)"></ProgressBar>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProgressBar from "./ProgressBar.vue";
export default {
    name: "ProjectCard",
    data() {
        return {
            cols: 2,
            value: 45,
            max: 100,
        }
    },
    props: {
        projects: Array,
    },
    components: {
        ProgressBar,
    },
    computed: {
        projectPairs() {
            const pairs = [];

            for (let i = 0; i < this.projects.length; i += this.cols) {
                const pair = [this.projects[i], this.projects[i + 1]];
                pairs.push(pair);
            }
            return pairs;
        },
    },
    methods: {
        dateFormat(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");

            const formattedDate = `${year}/${month}/${day}`;
            return formattedDate;
        },
        openProject(projectId) {
            this.$emit('open:project', projectId)
        },
        getImageUrl(project) {
            return project.project_contents[0].imageUrl;
        },
        checkHasImage(project) {
            if (project.project_contents) {
                if (project.project_contents[0].imageUrl) {
                    return true;
                }
            }
            return false;
        },
        checkProcessStatus(project) {
            if (project.start_at && project.end_at) {
                const currentDate = new Date();
                const startAt = new Date(project.start_at);
                const endAt = new Date(project.end_at);
                if (currentDate < startAt) {
                    return '시작전';
                } else if (currentDate >= startAt && currentDate <= endAt) {
                    return '진행중';
                } else {
                    return '종료';
                }
            } else {
                return 'null';
            }
        },
        calcCompleted(project) {
            var completed;
            switch (this.checkProcessStatus(project)) {
                case '시작전':
                    completed = 0;
                    break;
                case '진행중':
                    var currentDate = new Date();
                    var startAt = new Date(project.start_at);
                    var endAt = new Date(project.end_at);
                    completed = Math.round((currentDate - startAt) / (endAt - startAt) * 100, 2);
                    break;
                case '종료':
                    completed = 100;
                    break;
                case 'null':
                    completed = -1;
                    break;
            }
            return completed;
        },
        getBgColor(project) {
            var bgColor;
            switch (this.checkProcessStatus(project)) {
                case '시작전':
                case '진행중':
                    bgColor = '#6a1b9a';
                    break;
                case '종료':
                    bgColor = '#6a1b9a';
                    break;
                case 'null':
                    bgColor = 'darkgrey';
                    break;
            }
            return bgColor;
        },
    },
}
</script>

<style>
.container {
    max-width: fit-content;
    width: fit-content;
}

.row {
    width: fit-content;
}

.card {
    margin-top: 5%;
    box-shadow: 2px 3px 5px 0px;
    cursor: pointer;
}

.thumbnail {
    width: 80%;
    align-self: center;
}

small {
    float: right;
}
</style>