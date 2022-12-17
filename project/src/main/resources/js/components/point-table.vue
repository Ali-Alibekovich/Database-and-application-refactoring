<template>
    <div>
        <table :class="['table mt-2 mb-1', isDarkTheme ? 'table-dark' : 'bg-indigo-200']">
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Result</th>
            </tr>
            <tr v-for="point in paginatedPoints" :key="point.id" :class="{'selected': point.selected}" @click="clickRow(point)">
                <td>{{point.x}}</td>
                <td>{{point.y}}</td>
                <td>{{point.r}}</td>
                <td>{{point.result}}</td>
            </tr>
            <tr v-for="index in (numberOfRowInTable - paginatedPoints.length)">
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
        </table>
        <div v-if="!POINTS.length" style="text-align: center" :class="[isDarkTheme ? 'bg-dark text-light': 'bg-indigo-200']">Table is empty</div>
        <nav v-else :class="['nav justify-content-center', isDarkTheme ? 'bg-dark': 'bg-indigo-200']">
            <button  @click="pageNumber = 1" :class="[isDarkTheme ? 'btn btn-dark m-0' : 'btn btn-light m-0']"><<</button>
            <button @click="pageNumber -= 1" :class="[isDarkTheme ? 'btn btn-dark m-0' : 'btn btn-light m-0']"><</button>
            <button :class="[isDarkTheme ? 'btn btn-dark m-0' : 'btn btn-light m-0']">{{pageNumber}}</button>
            <button @click="pageNumber += 1" :class="[isDarkTheme ? 'btn btn-dark m-0' : 'btn btn-light m-0']">></button>
            <button @click="pageNumber = pages" :class="[isDarkTheme ? 'btn btn-dark m-0' : 'btn btn-light m-0']">>></button>

            <button v-if="countSelectedPoints > 0" @click="deleteSelectedPoints" :class="[isDarkTheme ? 'btn btn-dark m-0' : 'btn btn-light m-0']">
                Delete {{countSelectedPoints}} selected points
            </button>
            <button v-else @click="clear" :class="[isDarkTheme ? 'btn btn-dark m-0' : 'btn btn-light m-0']">Clear</button>
        </nav>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "point-table",
        data(){
            return {
                countSelectedPoints: 0,
                pageNumber: 1
            }
        },
        methods: {
            ...mapActions(['GET_POINTS', 'CLEAR', 'DELETE_POINTS']),
            clickRow(point){
                point.selected = !point.selected

                if (point.selected) this.countSelectedPoints += 1
                else this.countSelectedPoints -= 1
            },
            deleteSelectedPoints(){
                let ids = []
                for (let i = 0; i < this.POINTS.length; i++){
                    if (this.POINTS[i].selected) ids.push(this.POINTS[i].id)
                }

                this.DELETE_POINTS(ids)
                this.countSelectedPoints = 0
                if (this.pages < this.pageNumber) this.pageNumber = this.pages
            },
            clear(){this.CLEAR(); this.pageNumber = 1}
        },
        watch: {
            pageNumber: function () {
                if (this.pageNumber < 1) this.pageNumber = 1
                const pages = Math.ceil(this.POINTS.length / this.numberOfRowInTable)
                if (this.pageNumber > pages) this.pageNumber = pages
            }
        },
        computed: {
            ...mapGetters(['POINTS', 'numberOfRowInTable', 'isDarkTheme']),
            pages(){return Math.ceil(this.POINTS.length / this.numberOfRowInTable)},
            paginatedPoints(){
                const from = (this.pageNumber - 1) * this.numberOfRowInTable
                const to = from + this.numberOfRowInTable
                return this.POINTS.slice(from, to)
            }
        },
        mounted(){this.GET_POINTS()}
    }
</script>

<style scoped>
    .selected {
        background-color: #f1aeb5;
    }
    .btn-light {
        color: #212529;
        background-color: #c29ffa;
        border-color: #212529;
    }
    .btn-light:focus {
        color: #212529;
        background-color: #c29ffa;
        border-color: #212529;
    }
    .btn-light:hover {
        color: #212529;
        background-color: #e0cffc;
        border-color: #212529;
    }
    .atop{
        z-index: 1;
    }
</style>