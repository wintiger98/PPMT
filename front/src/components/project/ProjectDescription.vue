<template>
    <div class="form-group">
        <!-- 프로젝트 제목 표시 (편집 가능하도록 설정) -->
        <h5 ref="editableDescription" @click="editDescription" @input="updateDescription" :contenteditable="isEditing">{{
            description }}</h5>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isEditing: false, // 편집 모드 여부
        };
    },
    props: {
        description: {
            type: String,
            default: "프로젝트 설명",
        },
    },
    methods: {
        editDescription() {
            this.isEditing = true; // 편집 모드 활성화
        },
        updateDescription() {
            // 편집 중에 입력이 변경될 때마다 호출됩니다.
            // 여기서 데이터를 업데이트하고 자동으로 저장할 수 있습니다.
            const newDescription = this.$refs.editableDescription.innerText; // 현재 설명 업데이트
            const data = { key: "description", value: newDescription };
            this.$emit('update:description', data);
        },
    },
};
</script>

<style>
h5 {
    width: -webkit-fill-available;
}
</style>