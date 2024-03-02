<template>
    <div class="form-group">
        <label for="tech">기술 스택</label>
        <div class="stack">
            <div class="stack-item" v-for="(t, index) in localTech" :key="index">
                {{ t }}
                <button class="delete" @click="removeTech(index)"> X </button>
            </div>
        </div>
        <button @click="showAddModal"> + </button>
        <!-- 모달 창 -->
        <div v-if="isAddModalVisible" class="modal" style="display: flex;">
            <!-- 모달 내용 및 입력란 -->
            <div class="modal-content">
                <div class="form-group row">
                    <label for="newTech" class="col-sm-2 col-form-label">기술 스택</label>
                    <div class="col-sm-6 input-group">
                        <input type="text" id="newTech" v-model="newTech" class="form-control">
                        <div class="input-group-append">
                            <button @click="addNewTech" class="btn btn-primary">추가</button>
                        </div>
                    </div>
                </div>
                <div class="stack">
                    <div v-for="(t, index) in toAddTechs" :key="index" class="stack-item">
                        {{ t }}
                        <button class="delete" @click="removeAddTech(index)"> X </button>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeAddModal">닫기</button>
                    <button type="button" class="btn btn-primary" @click="addTech">저장</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            localTech: [],
            newTech: "",
            isAddModalVisible: false,
            toAddTechs: [],
        };
    },
    watch: {
        tech(newTech) {
            this.localTech = newTech;
        },
    },
    props: {
        tech: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        removeTech(index) {
            // 기술 스택 삭제
            this.localTech.splice(index, 1);
        },
        removeAddTech(index) {
            // 기술 스택 삭제
            this.toAddtechs.splice(index, 1);
        },
        showAddModal() {
            // 기술 스택 추가 모달 창 표시
            this.isAddModalVisible = true;
        },
        closeAddModal() {
            // 추가 모달 창 닫기
            this.isAddModalVisible = false;
        },
        addNewTech() {
            // 추가 모달 창 내에서 추가
            if (this.newTech.trim() != "") {
                this.toAddTechs.push(this.newTech);
                this.newTech = "";
            }
        },
        addTech() {
            // 추가 모달 창의 결과 저장
            if (this.toAddTechs.length > 0) {
                this.localTech = this.tech || [];
                this.localTech.push(...this.toAddTechs);
                this.isAddModalVisible = false;
                const data = { key: "tech", value: this.localTech };
                this.$emit('update:tech', data);
            } else {
                alert("기술 스택을 입력하세요!");
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