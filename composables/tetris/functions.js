import { tetrominos, colors } from '@/composables/tetris/data'

export const pickFigure = () => {
  const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  const color = colors[getRandomInt(0, 6)];
  const figure = tetrominos[sequence[getRandomInt(0, 6)]];
  return [color, figure];
}

export const rotateFigure = (matrix) => {
  const N = matrix.length - 1;
  const result = matrix.map((row, i) =>
    row.map((val, j) => matrix[N - j][i])
  );
  return result;
}

// function drawFigure(color, figure, playfield) {
//   console.log(color, figure, playfield)
// }

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}