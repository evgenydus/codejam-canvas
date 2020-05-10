const canvas = document.getElementById('canvas');
const canvasContext = canvas.getContext('2d');

/* const dataCallback = response => response.json().then(data => data)
const contentSmall = fetch('assets/4x4.json').then(dataCallback)
const contentLarge = fetch('assets/32x32.json').then(dataCallback) */
// TODO: handle canvasData properly according the Promise.all documentation

import { contentSmall } from './4x4';
import { contentLarge } from './32x32';

const canvasSideLength = 512;

const squareSizes = {
  small: 4,
  large: 32
};

const drawSmallSquareLength = canvasSideLength / squareSizes.small;
const drawLargeSquareLength = canvasSideLength / squareSizes.large;

 const contentLargeFormatted = contentLarge.map(level1 => level1.map(level2 => {
  const alpha = level2[3];
   level2[3] = alpha / 255;

  return level2
}));

function clearCanvas() {
  canvasContext.clearRect(0, 0, canvasSideLength, canvasSideLength)
}

function drawSmall() {
  contentSmall.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      canvasContext.fillStyle = `#${column}`;
      canvasContext.fillRect(columnIndex * drawSmallSquareLength, rowIndex * drawSmallSquareLength, drawSmallSquareLength, drawSmallSquareLength);
    })
  })
}

function drawLarge() {
  contentLargeFormatted.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      canvasContext.fillStyle = `rgba(${column})`;
      canvasContext.fillRect(columnIndex * drawLargeSquareLength, rowIndex * drawLargeSquareLength, drawLargeSquareLength, drawLargeSquareLength);
    })
  })
}

const buttons = document.querySelectorAll('.draw-button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    clearCanvas();
    const buttonText = button.innerText;
    if (buttonText === '4x4') drawSmall();
    if (buttonText === '32x32') drawLarge()
  })
});
