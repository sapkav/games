<template>
  <div style="background-color: pink; display: flex; align-items: center; justify-content: center; height: calc(100vh - 37px)" id="tetris">
    <button style="position: absolute; left: 100px" @click="startGame" v-if="!isGameStart">start</button>
    <div style="background-color: black; width: 340px; height: 660px; padding: 8px;" @keyup.a="onPressA">
      <canvas width="320" height="640" id="game" style="border: 2px solid #3083b6;"></canvas>
      <canvas width="320" height="640" id="setka" style="position: absolute; left: calc(50vw - 160px); margin-top: 2px"></canvas>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { pickFigure, rotateFigure } from '@/composables/tetris/functions'

export default {
  name: 'Tetris',
  setup() {
    let ctx;
    onMounted(async () => {
      document.addEventListener('keydown', function(event) {
        if (event.which >= 37 && event.which <= 40) keyController(event.which);
      });
      const canvas = document.getElementById("game");
      ctx = canvas.getContext("2d");
      const canvas1 = document.getElementById("setka");
      const ctx1 = canvas1.getContext("2d");

      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, 320, 640);
      ctx.lineWidth = 1;
      ctx1.strokeStyle = "white";

      for (let i = 32; i < 640; i += 32) {
        if (i < 320) {
          ctx1.moveTo(i, 0);
          ctx1.lineTo(i, 640);
          ctx1.stroke();
        }
        ctx1.moveTo(0, i);
        ctx1.lineTo(320, i);
        ctx1.stroke();
      }
    })

    const cellCise = 32;
    let isGameStart = false;
    let row = 0;
    let column = 3;
    let color = '';
    let figure = [];

    const startGame = () => {
      isGameStart = true;
      const playfield = [];
      for (let row = 0; row < 20; row++) {
        playfield[row] = [];

        for (let col = 0; col < 10; col++) {
          playfield[row][col] = 0;
        }
      }
      [color, figure] = pickFigure();
      ctx.fillStyle = color;

      setInterval(() => {
        for (let i = 0; i < 10; i++) {
          for (let j = 0; j < 20; j++) {
            if (playfield[i][j] === 1) {
              playfield[i][j] = 0;
            }
          }
        }
        for (let i = 0; i < figure.length; i++) {
          for (let j = 0; j < figure[i].length; j++) {
            playfield[column + j][row + i] = figure[i][j]; 
          }
        }
        ctx.clearRect(0, 0, 320, 640);
        for (let i = 0; i < 10; i++) {
          for (let j = 0; j < 20; j++) {
            if (playfield[i][j] === 1) {
              ctx.fillRect(cellCise * i, cellCise * j, 32, 32);
            }
          }
        }
        row++;

        if (row >= 19) {
          [color, figure] = pickFigure();
          ctx.fillStyle = color;
          row = 0;
        }
      }, 300);
    }
    
    const keyController = (keyNumber) => {
      if (!isGameStart) return;
      console.log(keyNumber);
      if (keyNumber === 37 && column !== 0) {
        column--;
      } else if (keyNumber === 39 && column < 10 - figure.length) {
        column++;
      } else if (keyNumber === 40) {
        row++;
      } else if (keyNumber === 38) {
        figure = rotateFigure(figure);
      }
    }

    return {
      startGame,
      isGameStart
    }
  }
}
</script>

<style>

</style>