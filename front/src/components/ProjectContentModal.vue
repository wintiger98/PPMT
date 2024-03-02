<template>
    <div>
        <vue-final-modal v-model="localShowModal" classes="modal-container" content-class="modal-content">
            <button class="modal__close" @click="closeModal">
                <mdi-close>X</mdi-close>
            </button>
            <span class="modal__title">내용 추가</span>
            <div class="modal__content">
                <div class="max-w-md mx-auto">
                    <div>
                        <button v-for="type in types" :key="type"
                            :class="{ 'selected-type': selectedType == type, 'styled-type': true }" @click="setTitle(type)">

                            {{ type }}
                        </button>
                    </div>

                    <div>
                        <label for="direct-input">직접 입력:</label>
                        <input id="direct-input" v-model="directInput" type="text" class="styled-input"
                            @input="setTitle(directInput)">
                    </div>
                </div>
            </div>
            <button @click="showDetailModal = true" class="styled-button">선택</button>
            <ProjectContentDetailVue :showModal="showDetailModal" :title="title" @close="showDetailModal = false"
                @save="saveContentDetail">
            </ProjectContentDetailVue>
        </vue-final-modal>
    </div>
</template>

<script>
import ProjectContentDetailVue from './ProjectContentDetail.vue'

export default {
    data: () => ({
        selectedType: null,
        showDetailModal: false,
        localShowModal: false,
        types: ["프로젝트 제안", "디자인", "DB", "클래스 다이어그램"],
        directInput: "",
        showProjectContentDetailVue: false,
        title: "",
    }),
    props: {
        showModal: {
            type: Boolean,
            required: true,
        },
    },
    watch: {
        showModal(newValue) {
            this.localShowModal = newValue;
        },
        localShowModal(newValue) {
            if (!newValue) {
                this.$emit('close');
            }
        },
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        setTitle(value) {
            this.title = value;
        },
        saveContentDetail(data) {
            this.$emit('save', data);
        }
    },
    components: {
        ProjectContentDetailVue,
    },
}
</script>

<style scoped>
::v-deep .modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

::v-deep .modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 25rem;
    padding: 2rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
    background: #fff;
}

.modal__title {
    margin: 0 2rem 0 0;
    font-size: 1.5rem;
    font-weight: 700;
}

.modal__close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 2rem;
    height: 2rem;
    background-color: #fff;
    /* or any other color */
    color: #000;
    /* or any other color */
}
</style>

<style scoped>
.dark-mode div::v-deep .modal-content {
    border-color: #2d3748;
    background-color: #1a202c;
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
    width: fit-content;
    align-self: right;
}

.styled-type {
    background-color: #2d3748;
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
    width: fit-content;
}

.selected-type {
    background-color: white;
    color: black;
    /* 선택된 버튼의 테두리 색상 */
}

.styled-input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
}
</style>