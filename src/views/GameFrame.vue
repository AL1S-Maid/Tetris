<script>
import { blockMod, transition } from '@/utils/data'

export default {
  data(){
    return {
      row: 20,
      col: 10,
      frame: [],
      ass: [],
      bg: '#eee',
      block: [],
      now: { b: 0, c: 0 },
      next: { b: 0, c: 0 },
      nowBlock: [],
      nextBlock: [],
      rotationAngle: 0,
      timer: '',
      speed: 800,
      stop: true,
      removeRow: [],
      score: 0,
      level: 1,
      times: 0
    }
  },
  methods: {
    gameFrame(){
      //主屏
      for (let i = 0; i < this.row; i++) {
        let tempArr = []
        for (let j = 0; j < this.col; j++) {
          let tempObj = {
            data: 0,
            bg: this.bg,
          }
          tempArr.push(tempObj)
        }
        this.frame.push(tempArr)
      }
      //副屏
      for (let i = 0; i < 4; i++) {
        let tempArr = []
        for (let j = 0; j < 4; j++) {
          let tempObj = {
            data: 0,
            bg: this.bg,
          }
          tempArr.push(tempObj)
        }
        this.ass.push(tempArr)
      }
    },
    getBlock(){
      this.block = blockMod()
    },
    async getNext(){
      this.next.b = Math.floor(Math.random() * this.block.length)
      this.next.c = Math.floor(Math.random() * 4)
    },
    init(){
      //渲染下一个形状数据
      this.now = JSON.parse(JSON.stringify(this.next))
      this.rotationAngle = this.now.c
      //渲染当前形状数据
      this.nowBlock = JSON.parse(JSON.stringify(this.block[this.now.b]))
      //渲染形状数据
      this.renderBlock(this.nowBlock, this.frame, 1)
      //旋转
      if (this.now.c > 0) {
        for (let i = 0; i < this.now.c; i ++) {
          this.rotate(this.nowBlock, this.frame, this.now, i)
        }
      }
      
      this.getNext().then(() => {
        if (this.nextBlock.site) {
          this.renderBlock(this.nextBlock, this.ass, 0)
        }
        //下一形状
        this.nextBlock = JSON.parse(JSON.stringify(this.block[this.next.b]))
        this.renderBlock(this.nextBlock, this.ass, 1)
        if (this.now.c > 0) {
          for (let i = 0; i < this.next.c; i ++) {
            this.rotate(this.nextBlock, this.ass, this.next, i)
          }
        }
      })
    },
    //渲染形状
    renderBlock(block, position, n){
      let tempVar = block.site
      if (n == 0) {
        //擦除
        for (let i = 0; i < tempVar.length; i += 2) {
          position[tempVar[i]][tempVar[i + 1]].bg = this.bg
        }
      } else if (n == 1) {
        //生成
        for (let i = 0; i < tempVar.length; i += 2) {
          position[tempVar[i]][tempVar[i + 1]].bg = block.color
        }
      } else if (n == 2) {
        //确定位置
        for (let i = 0; i < tempVar.length; i += 2) {
          position[tempVar[i]][tempVar[i + 1]].data = 1
        }
      }
    },
    rotate(currentBlock, remderPosition, renderObjects, rotationAngle){
      this.renderBlock(currentBlock, remderPosition, 0)
      //记录第一个方块位置
      const blockX = currentBlock.site[0]
      const blockY = currentBlock.site[1]
      for (let i = 0; i < currentBlock.site.length; i += 2) {
        let tempVar = currentBlock.site[i]
        currentBlock.site[i] = currentBlock.site[i + 1] - blockY + blockX + transition[renderObjects.b][rotationAngle].x
        currentBlock.site[i + 1] = -(tempVar - blockX) + blockY + transition[renderObjects.b][rotationAngle].y
      }
      rotationAngle ++
      if (rotationAngle == 4) {
        rotationAngle = 0
      }
      this.renderBlock(currentBlock, remderPosition, 1)
    },
    autoMoveDown(){
      this.timer = setInterval(() => {
        this.moveDown()
      }, this.speed)
    },
    stopGame(){
      this.stop = !this.stop
      if (this.stop) {
        clearInterval(this.timer)
      } else {
        this.autoMoveDown()
      }
    },
    moveDown(){
      if (this.canMove('down')) {
        //清0再渲染数据
        this.renderBlock(this.nowBlock, this.frame, 0)
        for (let i = 0; i < this.nowBlock.site.length; i += 2) {
          this.nowBlock.site[i]++
        }
        this.renderBlock(this.nowBlock, this.frame, 1)
      } else {
        this.renderBlock(this.nowBlock, this.frame, 2)
        this.removeBlock()
        this.init()
      }
    },
    moveLeft(){
      if (this.canMove('left')) {
        //清0再渲染数据
        this.renderBlock(this.nowBlock, this.frame, 0)
        for (let i = 0; i < this.nowBlock.site.length; i += 2) {
          this.nowBlock.site[i + 1]--
        }
        this.renderBlock(this.nowBlock, this.frame, 1)
      }
    },
    moveRight(){
      if (this.canMove('right')) {
        //清0再渲染数据
        this.renderBlock(this.nowBlock, this.frame, 0)
        for (let i = 0; i < this.nowBlock.site.length; i += 2) {
          this.nowBlock.site[i + 1]++
        }
        this.renderBlock(this.nowBlock, this.frame, 1)
      }
    },
    canMove(e){
      let num = 0
      let coordinate = this.nowBlock.site
      //预判移动
      switch (e) {
        case 'right':
          for (let i = 0; i < coordinate.length; i +=2) {
            if (coordinate[i + 1] >= this.col - 1) {
              return false
            }
            num += this.frame[coordinate[i]][coordinate[i + 1] + 1].data
          }
          if (num > 0) {
            return false
          }
          break
        case 'left':
          for (let i = 0; i < coordinate.length; i +=2) {
            if (coordinate[i + 1] <= 0) {
              return false
            }
            num += this.frame[coordinate[i]][coordinate[i + 1] - 1].data
          }
          if (num > 0) {
            return false
          }
          break
        case 'down':
          for (let i = 0; i < coordinate.length; i +=2) {
            if (coordinate[i] >= this.row - 1) {
              return false
            }
            num += this.frame[coordinate[i] + 1][coordinate[i + 1]].data
          }
          if (num > 0) {
            return false
          }
          break
      }
      return true
    },
    rotateDown(){
      const currentBlock = JSON.parse(JSON.stringify(this.nowBlock))
      //记录第一个方块位置
      const blockX = currentBlock.site[0]
      const blockY = currentBlock.site[1]
      let n = true
      for (let i = 0; i < currentBlock.site.length; i += 2) {
        let tempVar = currentBlock.site[i]
        currentBlock.site[i] = currentBlock.site[i + 1] - blockY + blockX + transition[this.now.b][this.rotationAngle].x
        currentBlock.site[i + 1] = -(tempVar - blockX) + blockY + transition[this.now.b][this.rotationAngle].y

        if (currentBlock.site[i + 1 < 0 || currentBlock.site[i + 1] >= this.col] || currentBlock.site[i] >= this.row || this.frame[currentBlock.site[i]][currentBlock.site[i + 1]].data > 0) {
          n = false
        }
      }
      if (n) {
        this.renderBlock(this.nowBlock, this.frame, 0)
        this.rotationAngle ++
        if (this.rotationAngle == 4) {
          this.rotationAngle = 0
        }
        this.nowBlock = currentBlock
        this.renderBlock(this.nowBlock, this.frame, 1)
      }
    },
    removeBlock(){
      for (let i = 0; i < this.row; i++) {
        let a = 0
        for (let j = 0; j < this.col; j++) {
          if (this.frame[i][j].data == 1) {
            a++
          }
        }
        if (a == this.col) {
          this.removeRow.push(i)
        }
      }
      //判断是否可以消除行
      if (this.removeRow.length > 0) {
        for (let i = 0; i < this.removeRow.length; i++) {
          let j = 0
          let timer = setInterval(() => {
            this.frame[this.removeRow[i]][j] = {
              bg: this.bg,
              data: 0
            }
            j++
            if (j == this.col) {
              clearInterval(timer)
            }
          }, 20)
        }
        setTimeout(() => {
          for (let i = this.row - 1; i >= 0; i--) {
            let a = 0
            for (let j = 0; j < this.removeRow.length; j++) {
              if (this.removeRow[j] > i) {
                a++
              }
            }
            if (a > 0) {
              for(let k = 0; k < this.col; k++) {
                if (this.frame[i][k].data == 1) {
                  //向下移动
                  this.frame[i + a][k] = this.frame[i][k]
                  //清除
                  this.frame[i][k] = {
                    bg: this.bg,
                    data: 0
                  }
                }
              }
            }
          }
          this.removeRow = []
          this.init()
        }, 20 * this.col)

        this.times++

        let lev = Math.floor(this.times / 10) + 1
        if (lev > this.level) {
          this.level = lev
          //速度
          if (this.level < 16) {
            this.speed = 800 - (this.level - 1) * 80
          } else {
            this.speed = 30
          }
          //清除当前下落
          clearInterval(this.timer)
          //加速
          this.autoMoveDown()
        }
        this.level = this.times

        this.score += ((this.removeRow.length) * (this.removeRow.length + 1) / 2) * 100 * this.level
      } else {
        this.init()
      }
    }
  },
  mounted(){
    this.gameFrame()
    this.getBlock()
    this.getNext()
    this.init()
  }
}
</script>

<template>
  <main class="game">
    <div class="game-div">
      <div class="controls">
        <div class="toLeft item" style="grid-column: 1;" @click="moveLeft()">Left</div>
        <div class="rotate item" style="grid-column: 2;" @click="rotateDown()">Rotate</div>
        <div class="toRight item" style="grid-column: 3;" @click="moveRight()">Right</div>
        <div 
        class="down item" 
        style="grid-column: 2; 
        grid-row: 2;"
        @click="moveDown()"
        >
          Down
        </div>
        <div class="confirm item" style="grid-column: 1 / span 3; grid-row: 3;">Confirm</div>
      </div>
      <div class="game-min">
        <div class="row" v-for="(row, i) in frame" :key="i">
          <p class="element" v-for="(col, j) in row" :key="j" :style="{background: col.bg}"></p>
        </div>
      </div>
      <div class="right">
        <div class="ass">
          <div class="row" v-for="(row, i) in ass" :key="i">
            <p class="element" v-for="(col, j) in row" :key="j" :style="{background: col.bg}"></p>
          </div>
        </div>
        <div class="empty">
          <div class="text">
            <p>Score</p>
            <p>{{ score }}</p>
          </div>
          <div class="text">
            <p>LV</p>
            <p>{{ level }}</p>
          </div>
          <div class="text">
            <p>Eliminate</p>
            <p>{{ times }}</p>
          </div>
          <div class="switch" @click="stopGame()">
            Start / Stop
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.game {
  .game-div {
    display: flex;
    gap: 15px;
    align-items: center;
    justify-content: center;
    .controls {
      display: grid;
      grid-template-columns: repeat(3, 60px);
      grid-template-rows: repeat(3, 60px);
      align-content: center;
      gap: 12px;
      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(179, 179, 179, 0.678);
        border-radius: 6px;
        font-size: 1rem;
        font-weight: 600;
        transition: all 0.3s;
        &:hover {
          color: #fff;
          font-weight: 600;
        }
      }
    }
    .game-min {
      .row {
        display: flex;
        gap: 1px;
        padding-top: 1px;
        .element {
          width: 30px;
          height: 30px;
        }
      }
    }
    .right {
      .ass {
        .row {
          display: flex;
          gap: 1px;
          padding-top: 1px;
          .element {
            width: 30px;
            height: 30px;
          }
        }
      }
      .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        height: 55%;
        .text p {
          text-align: center;
          font-size: 1rem;
        }
        .switch {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(179, 179, 179, 0.678);
          border-radius: 6px;
          font-size: 15px;
          font-weight: 600;
          width: 100px;
          height: 45px;
          transition: all 0.3s;
          &:hover {
            color: #fff;
          }
        }
      }
    }
  }
}

</style>
