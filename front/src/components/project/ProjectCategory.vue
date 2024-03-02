<template>
    <div class="form-group">
        <label for="categories">카테고리</label>
        <div class="stack">
            <div class="stack-item" v-for="(category, index) in localCategories" :key="index">
                {{ category }}
                <button class="delete" @click="removeCategory(index)"> X </button>
            </div>
        </div>
        <button @click="showAddModal"> + </button>
        <!-- 모달 창 -->
        <div v-if="isAddModalVisible" class="modal" style="display: flex;">
            <!-- 모달 내용 및 입력란 -->
            <div class="modal-content">
                <div class="form-group row">
                    <label for="newCategory" class="col-sm-2 col-form-label">카테고리</label>
                    <div class="col-sm-6 input-group">
                        <input type="text" id="newCategory" v-model="newCategory" class="form-control">
                        <div class="input-group-append">
                            <button @click="addNewCategory" class="btn btn-primary">추가</button>
                        </div>
                    </div>
                </div>
                <div class="stack">
                    <div v-for="(t, index) in toAddCategories" :key="index" class="stack-item">
                        {{ t }}
                        <button class="delete" @click="removeAddCategory(index)"> X </button>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeAddModal">닫기</button>
                    <button type="button" class="btn btn-primary" @click="addCategory">저장</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            localCategories: [],
            newCategory: "",
            isAddModalVisible: false,
            toAddCategories: [],
        };
    },
    watch: {
        categories(newCategories) {
            this.localCategories = newCategories;
        },
    },
    props: {
        categories: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        removeCategory(index) {
            // 기술 스택 삭제
            this.localCategories.splice(index, 1);
        },
        removeAddCategory(index) {
            // 기술 스택 삭제
            this.toAddCategories.splice(index, 1);
        },
        showAddModal() {
            // 기술 스택 추가 모달 창 표시
            this.isAddModalVisible = true;
        },
        closeAddModal() {
            // 추가 모달 창 닫기
            this.isAddModalVisible = false;
        },
        addNewCategory() {
            // 추가 모달 창 내에서 추가
            if (this.newCategory.trim() != "") {
                this.toAddCategories.push(this.newCategory);
                this.newCategory = "";
            }
        },
        addCategory() {
            // 추가 모달 창의 결과 저장
            if (this.toAddCategories.length > 0) {
                this.localCategories = this.categories || [];
                this.localCategories.push(...this.toAddCategories);
                this.isAddModalVisible = false;
                const data = { key: "categories", value: this.localCategories };
                this.$emit('update:categories', data);
            } else {
                alert("카테고리를 입력하세요!");
            }
        },
    }
}
</script>

<style>
.stack {
    display: flex;
    flex-wrap: wrap;
    /* 스택이 넘칠 경우 다음 줄로 넘어갑니다. */
}

.stack-item {
    margin-right: 10px;
    /* 스택 사이 간격 조정 */
    margin-bottom: 10px;
    /* 스택의 아래 여백 조정 */
    padding: 5px 10px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    align-items: center;
}

.delete {
    margin-left: 5px;
    border: none;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
</style>