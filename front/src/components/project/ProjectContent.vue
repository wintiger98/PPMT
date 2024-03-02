<template>
    <div class="form-group">
        <label>{{ projectContent.title }}</label>
        <div v-if="projectContent.image_url">
            <img :src="projectContent.image_url" class="img-thumbnail" alt="...">
        </div>
        <div v-if="projectContent.link_url">
            {{ projectContent.link_url }}
        </div>
        <div v-if="projectContent.contents">
            {{ projectContent.contents }}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            localProjectContent: {},
        };
    },
    props: {
        projectContent: {
            type: Object,
            default: () => { },
        },
    },
    watch: {
        projectContent(newContent) {
            this.localProjectContent = newContent;
        },
    },
}
</script>

<style></style>