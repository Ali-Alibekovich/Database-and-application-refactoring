<template>
    <div>
        <canvas ref="canvas" width="350" height="350" @click="clickCanvas"/>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import {points} from "../store/modules/points"
    import axios from 'axios'
    import authHeader from "../auth/auth-header"
    export default {
        name: "interactive-object",
        data(){
            return {
                canvas: null,
                ctx: null,
                width: null,
                height: null,
                values: [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2],
            }
        },
        mounted() {
            const vm = this
            vm.canvas = vm.$refs.canvas
            vm.ctx = vm.canvas?.getContext("2d")
            vm.width = vm.canvas?.width
            vm.height = vm.canvas?.height
            vm.redraw()
        },
        methods: {
            ...mapActions(['POST_POINTS', 'RECALCULATED_POINTS']),
            redraw(){
                const vm = this
                const R = vm.R
                const rad = vm.height / 40
                vm.ctx.fillStyle = vm.backgroundColor
                vm.ctx.fillRect(0, 0, vm.width, vm.height)

                vm.fillArea(R)

                vm.ctx.fillStyle = "black"
                vm.canvas_arrow(vm.width / 2, vm.height - rad, vm.width / 2, rad, R)
                vm.canvas_arrow(rad, vm.height / 2, vm.width - rad, vm.height / 2, R)
                if (R >= 0){
                    vm.ctx.fillText("X", Number(vm.width) - rad - 5, vm.height / 2 - rad)
                    vm.ctx.fillText("Y", vm.width / 2 + rad, rad + 5)
                }
                if (R <= 0){
                    vm.ctx.fillText("X", rad + 5, vm.height / 2 - rad)
                    vm.ctx.fillText("Y", vm.width / 2 + rad, Number(vm.height) - rad - 5)
                }

                if (vm.values.indexOf(R) !== -1) {
                    vm.addMark((-R).toFixed(2), vm.width / 2, 5 / 6 * vm.height)
                    vm.addMark((-R / 2).toFixed(2), vm.width / 2, 4 / 6 * vm.height)
                    vm.addMark((R / 2).toFixed(2), vm.width / 2, 2 / 6 * vm.height)
                    vm.addMark(R.toFixed(2), vm.width / 2, 1 / 6 * vm.height)
                    vm.addMark((R / 2).toFixed(2), 4 / 6 * vm.width, vm.height / 2)
                    vm.addMark(R.toFixed(2), 5 / 6 * vm.width, vm.height / 2)
                    vm.addMark((-R / 2).toFixed(2), 2 / 6 * vm.width, vm.height / 2)
                    vm.addMark((-R).toFixed(2), 1 / 6 * vm.width, vm.height / 2)

                    vm.paintPoints(R)
                }
            },
            canvas_arrow(fromx, fromy, tox, toy, R) {
                const headlen = 5 // length of head in pixels
                const angle = Math.atan2(toy - fromy, tox - fromx)
                const vm = this

                vm.ctx.beginPath()
                if (R <= 0) {
                    vm.ctx.moveTo(fromx, fromy)
                    vm.ctx.lineTo(fromx + headlen * Math.cos(angle + Math.PI / 6), fromy + headlen * Math.sin(angle + Math.PI / 6))
                    vm.ctx.moveTo(fromx, fromy)
                    vm.ctx.lineTo(fromx + headlen * Math.cos(angle - Math.PI / 6), fromy + headlen * Math.sin(angle - Math.PI / 6))
                }
                vm.ctx.moveTo(fromx, fromy)
                vm.ctx.lineTo(tox, toy)
                if (R >= 0) {
                    vm.ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6))
                    vm.ctx.moveTo(tox, toy)
                    vm.ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6))
                }
                vm.ctx.stroke()
            },
            addMark(label, x, y) {
                const vm = this
                const rad = vm.height / 40
                if (x === vm.width / 2) {
                    vm.ctx.beginPath()
                    vm.ctx.moveTo(x - rad / 2, y)
                    vm.ctx.lineTo(x + rad / 2, y)
                    vm.ctx.stroke()
                    vm.ctx.fillText(label, x + rad, y)
                }
                if (y === vm.height / 2) {
                    vm.ctx.beginPath()
                    vm.ctx.moveTo(x, y - rad / 2)
                    vm.ctx.lineTo(x, y + rad / 2)
                    vm.ctx.stroke()
                    vm.ctx.fillText(label, x, y - rad)
                }
            },
            fillArea(r){
                const vm = this
                if (r > 0){
                    vm.ctx.fillStyle = vm.areaColor
                    vm.ctx.fillRect(vm.width / 2, vm.height / 2, - 1 / 6 * vm.width,  2 / 6 * vm.height)
                    vm.ctx.beginPath()
                    vm.ctx.moveTo(vm.width / 2, vm.height / 2)
                    vm.ctx.arc(vm.width / 2, vm.height / 2, 1 / 3 * vm.height, Math.PI,  1.5 * Math.PI)
                    vm.ctx.lineTo(vm.width / 2, vm.height / 2)
                    vm.ctx.fill()
                    vm.ctx.beginPath()
                    vm.ctx.moveTo(vm.width / 2, vm.height / 2)
                    vm.ctx.lineTo(5 / 6 * vm.width, vm.height / 2)
                    vm.ctx.lineTo(vm.width / 2, 4 / 6 * vm.height)
                    vm.ctx.lineTo(vm.width / 2, vm.height / 2)
                    vm.ctx.fill()
                }
                if (r < 0){
                    vm.ctx.fillStyle = vm.areaColor
                    vm.ctx.fillRect(vm.width / 2, vm.height / 2, 1 / 6 * vm.width, - 2 / 6 * vm.height)
                    vm.ctx.beginPath()
                    vm.ctx.moveTo(vm.width / 2, vm.height / 2)
                    vm.ctx.arc(vm.width / 2, vm.height / 2, 1 / 3 * vm.height, 0,  0.5 * Math.PI)
                    vm.ctx.lineTo(vm.width / 2, vm.height / 2)
                    vm.ctx.fill()
                    vm.ctx.beginPath()
                    vm.ctx.moveTo(vm.width / 2, vm.height / 2)
                    vm.ctx.lineTo(1 / 6 * vm.width, vm.height / 2)
                    vm.ctx.lineTo(vm.width / 2, 2 / 6 * vm.height)
                    vm.ctx.lineTo(vm.width / 2, vm.height / 2)
                    vm.ctx.fill()
                }
            },
            paintPoints(R) {
                const vm = this
                this.RECALCULATED_POINTS(R).then((response) => {
                    return response.data.forEach((point) => {
                        const x = vm.width / 2 + Number(point.x) * Math.round(vm.width / 3) / Math.abs(Number(R));
                        const y = vm.height / 2 - Number(point.y) * Math.round(vm.height / 3) / Math.abs(Number(R));
                        if (point.result) vm.paintPoint(x, y, vm.hitColor)
                        else vm.paintPoint(x, y, vm.missColor);
                    })
                })
            },
            paintPoint(x, y, color){
                this.ctx.fillStyle = color;
                this.ctx.beginPath();
                this.ctx.arc(x, y, 3, 0, 2 * Math.PI);
                this.ctx.fill();
            },
            clickCanvas(event){
                const vm = this
                const r = vm.R
                const x = event.pageX - (vm.canvas.getBoundingClientRect().left + pageXOffset)
                const y = event.pageY - (vm.canvas.getBoundingClientRect().top + pageYOffset)

                const cordX = Math.round(((x - vm.width / 2) * Math.abs(Number(r)) / Math.round(vm.width / 3))/0.5)*0.5
                const cordY = ((vm.height / 2 - y) * Math.abs(Number(r)) / Math.round(vm.height / 3)).toFixed(5)


                if (vm.values.indexOf(cordX) !== -1 && cordY >= -3 && cordY <= 3 && vm.values.indexOf(r) !== -1){
                    vm.POST_POINTS([{
                        x: cordX,
                        y: cordY,
                        r: r
                    }])
                }
            }
        },
        computed: {
            ...mapGetters(['R', 'POINTS', 'areaColor', 'hitColor',
                'missColor', 'isDarkTheme', 'backgroundColor']),
        },
        watch: {
            R: function () {this.redraw()},
            POINTS: function () {this.redraw()},
            isDarkTheme: function () {this.redraw()},
            areaColor: function () {this.redraw()},
            hitColor: function () {this.redraw()},
            missColor: function () {this.redraw()},
            backgroundColor: function () {this.redraw()}
        }
    }
</script>

<style scoped>

</style>