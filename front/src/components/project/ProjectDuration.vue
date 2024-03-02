<template>
    <div class="form-group">
        <label for="startAt">시작 날짜</label>
        <input type="date" id="startAt" v-model="localStartAt" @click="openDatePicker('startAt')">
        <label for="endAt">끝 날짜</label>
        <input type="date" id="endAt" v-model="localEndAt" @click="openDatePicker('endAt')">
    </div>
</template>

<script>
export default {
    data() {
        return {
            localStartAt: null,
            localEndAt: null,
        }
    },
    watch: {
        startAt(newStartAt) {
            // props인 startAt이 변경될 때 localStartAt을 업데이트합니다.
            this.localStartAt = this.dateFormat(newStartAt);
        },
        endAt(newEndAt) {
            // props인 endAt이 변경될 때 localEndAt을 업데이트합니다.
            this.localEndAt = this.dateFormat(newEndAt);
        },
        localStartAt(newValue) {
            const data = { key: "start_at", value: new Date(newValue).toISOString() };
            // localStartAt이 변경될 때, 부모 컴포넌트에 변경을 알립니다.
            this.$emit("update:startAt", data);
        },
        localEndAt(newValue) {
            const data = { key: "end_at", value: new Date(newValue).toISOString() };

            // localEndAt이 변경될 때, 부모 컴포넌트에 변경을 알립니다.
            this.$emit("update:endAt", data);
        },
    },
    props: {
        startAt: {
            type: String,
            default: null,
        },
        endAt: {
            type: String,
            default: null,
        },
    },
    methods: {
        openDatePicker(inputField) {
            // 입력 필드를 클릭하면 날짜 선택을 위한 datepicker를 열도록 함
            // inputField 매개변수는 어떤 입력 필드를 클릭했는지 식별하는 데 사용됨
            const inputElement = document.getElementById(inputField);
            inputElement.focus();
        },
        dateFormat(dateString) {
            const date = new Date(dateString);
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            return formattedDate;
        },
    },
}
</script>

<style></style>