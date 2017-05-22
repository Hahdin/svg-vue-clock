
new Vue({
    el: '#clock',
    data: function () {
        return {
            svgWidth: 400,
            svgHeight : 400,
            clockX: 200,
            clockY: 200,
            clockR: 180,
            updateInterval: 30,
            second: {x: 10, y: 10},
            minute: {x: 10, y: 10},
            hour: {x: 10, y: 10},
            myStyle: {
                second: {
                    color: 'red',
                    width: 1
                },
                minute: {
                    color: 'blue',
                    width: 8.5
                },
                hour: {
                    color: 'green',
                    width: 15.5
                }
            },
            interval : null
        }
    },
    watch: {
        updateInterval: function () {
    	    this.resetInterval()
        }
    },
    mounted: function () {
        this.resetInterval()
    },
    methods: {
        updateClock: function (){
            
            var t =new Date()
            var m = t.getMilliseconds() / 1000
            var degSecond = ((t.getSeconds() + m) * (360 /60)) * Math.PI / 180
            var degMinute = (t.getMinutes() * (360 /60)) * Math.PI / 180
            var degHour = (t.getHours() * (360 /12)) * Math.PI / 180
            this.second.x =this.clockX + this.clockR * Math.sin(degSecond ) + 2
            this.second.y =this.clockY - this.clockR * Math.cos(degSecond ) + 2
            this.minute.x =this.clockX + (this.clockR - (this.clockR / 7)) * Math.sin(degMinute)
            this.minute.y =this.clockY - (this.clockR - (this.clockR / 7)) * Math.cos(degMinute)
            this.hour.x =this.clockX + (this.clockR - (this.clockR / 3)) * Math.sin(degHour)
            this.hour.y =this.clockY - (this.clockR - (this.clockR / 3)) * Math.cos(degHour)
        },
        resetInterval: function () {
            var vm = this
            clearInterval(this.interval)
            this.updateClock()
            this.interval = setInterval(function () { 
                vm.updateClock()
            }, this.updateInterval)
        }
    }
})
