import Vue from 'vue'

function x(coordinates: string): number {
  return Number.parseInt(coordinates.split('x')[0])
}

function y(coordinates: string): number {
  return Number.parseInt(coordinates.split('x')[1])
}

type Board = {[key:string]: boolean}

function step(cells: Board):Board{
  const next: Board = {}
  const processed: Board = {}
  function process(x:number,y:number){
    const coordinates = `${x}x${y}`
    if (!processed[coordinates]){
      processed[coordinates] = true
      let neighbors: number = 0;
      for (let i=-1;i<=1;i++){
        for (let j=-1;j<=1;j++){
          if (i || j) {
            if (cells[`${x+i}x${y+j}`]){
              neighbors++
            }
          }
        }
      }
      const live = cells[coordinates]
      if (live && neighbors>=2 && neighbors <= 3){
        next[coordinates] = true
      }
      if (!live && neighbors == 3){
        next[coordinates] = true
      }
    }
  }
  for (const coordinates in cells){
    let xc = x(coordinates)
    let yc = y(coordinates)
    for (let i=-1;i<=1;i++){
      for (let j=-1;j<=1;j++){
        if (i || j) {
          process(xc+i,yc+j)
        }
      }
    }
    process(x(coordinates),y(coordinates))
  }
  return next;
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
        "1x0": true,
        "1x1": true,
        "1x2": true
      }
    }
  },
  mounted(){
    setInterval(()=> this.cells = step(this.cells), 1000)
  }
})

const cgl = new Vue({
  el: '#cgl',
  template: '<cgl></cgl>'
})
