
new Vue({
    el: '#clock',
    data: function () {
        return {
            svgWidth: 800,
            svgHeight : 800,
            clockX: 400,
            clockY: 400,
            clockR: 360,
            showText: true,
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
                },
                digits: {
                    pos: 'absolute',
                    x: '300px',
                    y: '450px',
                    w: '200px',
                    size: '20px',
                    bg: 'rgba(255, 0, 255, 0.1)',
                    clr: 'black',
                    pad: '10px',
                    margin: 'auto'

                }
            },
            interval : null
        }
    },
    mounted: function () {
        this.startClock()
    },
    methods: {
        getDate: function (){
            var t =new Date()
            return t.toLocaleTimeString()
        },
        toggleDigits: function(){
            this.showText = !this.showText
            this.myStyle.digits.pad = this.showText ? '15px' : '0px'
        },
        updateClock: function (){
            var t =new Date()
            var m = t.getMilliseconds() / 1000
            var degSecond = ((t.getSeconds() + m) * (360 /60)) * Math.PI / 180
            var degMinute = ((t.getMinutes() + t.getSeconds() / 60 ) * (360 /60)) * Math.PI / 180
            var degHour = ((t.getHours() + t.getMinutes() / 60 ) * (360 /12)) * Math.PI / 180
            this.second.x =this.clockX + this.clockR * Math.sin(degSecond ) + 2
            this.second.y =this.clockY - this.clockR * Math.cos(degSecond ) + 2
            this.minute.x =this.clockX + (this.clockR - (this.clockR / 7)) * Math.sin(degMinute)
            this.minute.y =this.clockY - (this.clockR - (this.clockR / 7)) * Math.cos(degMinute)
            this.hour.x =this.clockX + (this.clockR - (this.clockR / 3)) * Math.sin(degHour)
            this.hour.y =this.clockY - (this.clockR - (this.clockR / 3)) * Math.cos(degHour)
        },
        startClock: function () {
            var vm = this
            clearInterval(this.interval)
            this.updateClock()
            this.interval = setInterval(function () { 
                vm.updateClock()
            }, this.updateInterval)
        }
    }
})
