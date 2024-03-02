<template>
    <div class="container" style="max-width:fit-content">
        <div class="list-group">

            <div class="col-md-6" v-for="(project, j) in projects" :key="j">
                <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{{ project.title || `프로젝트${j + 1}` }}</h5>
                        <small>3 days ago</small>
                    </div>
                    <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
                        blandit.</p>
                    <small>Donec id elit non mi porta.</small>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProjectList",
    props: {
        projects: Array,
    },
}
</script>

<style></style>