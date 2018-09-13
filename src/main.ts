import Vue from 'vue'

function x(coordinates: string): number {
  return Number.parseInt(coordinates.split('x')[0])
}

function y(coordinates: string): number {
  return Number.parseInt(coordinates.split('x')[1])
}

Vue.component('cell',{
  props: ['cell'],
  template: `
  <div :style="{width:size+'px',height:size+'px',top:x+'px',left:y+'px', backgroundColor:'black', position: 'absolute'}">

  </div>
  `,
  computed:{
    x(){
      console.log(this.cell)
      return x(this.cell) * this.size
    },
    y(){
      return y(this.cell) * this.size
    }
  },
  data() { 
    return {
      size: 20
    }
  }
})

Vue.component('cgl',{
  template: `
  <div>
    <cell :cell="cell" v-for="(present,cell) in cells"></cell>
  </div>
  `,
  data(){
    return {
      cells: {
        "0x0": true,
        "2x3": true,
        "-2x3": true
      }
    }
  }
})

const cgl = new Vue({
  el: '#cgl',
  template: '<cgl></cgl>'
})
