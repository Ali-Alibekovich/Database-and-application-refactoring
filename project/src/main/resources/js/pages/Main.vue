<template>
    <div class="container-fluid">
        <div class="container content mt-2">
            <interactive-object/>
            <point-form/>
        </div>
        <point-table/>
    </div>
</template>

<script>
    import pointTable from '../components/point-table.vue'
    import pointForm from '../components/point-form.vue'
    import interactiveObject from '../components/interactive-object.vue'
    import {mapGetters} from "vuex"

    export default {
        name: "Main",
        components: {pointTable, pointForm, interactiveObject},
        computed: {...mapGetters(['isLoggedIn'])},
        created() {
            if (!this.isLoggedIn) {
                this.$router.push('/login')
            }
        },
    }
</script>

<style scoped>
    .content{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        justify-items: center;
        row-gap: 5px;
        padding: 0;
    }
</style>