'use strict';

window.renderStatistics = function (ctx, names, times) {
  var WIDTH_BILL_BOARD = 420;
  var HEIGHT_BILL_BOARD = 270;
  var BILL_BOARD_POSITION_X = 100;
  var BILL_BOARD_POSITION_Y = 10;
  var SHADOW_SHIFT = 10;
  var ANIMATION_DURATION_MILLISEC = 1000;
  var WIDTH_DIAGRAM_BAR = 40;
  var HEIGHT_DIAGRAM_BAR_MAX = 140;
  var SPACE_DIGRAM_BAR = 50;
  var VERTICAL_WHITE_SPACE = 5;
  var PADDING_LEFT = 20;
  var PADDING_TOP = 19;
  var FONT_SIZE = 16;
  var FONT_TYPE = 'PT Mono';
  var TEXT_COLOR = 'black';
  var DIAGRAM_BLOCK_POSITION_X = BILL_BOARD_POSITION_X + 40;
  var DIAGRAM_BLOCK_POSITION_Y = BILL_BOARD_POSITION_Y + 69;

  // Возвращает максимальный элемент массива
  var getMaxFromArray = function (array) {
    var max = -Infinity;
    for (var i = array.length - 1; i >= 0; i--) {
      if (max < array[i]) {
        max = array[i];
      }
    }
    return max;
  };

  // Отрисавывает прмоугольный столбик диаграммы
  var paintDiagramBar = function (x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  };

  // Отрисовывает фон
  var paintBillBoard = function (x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  };

  // Отрисовываем фоновое изображение
  paintBillBoard(BILL_BOARD_POSITION_X + SHADOW_SHIFT, BILL_BOARD_POSITION_Y + SHADOW_SHIFT, WIDTH_BILL_BOARD, HEIGHT_BILL_BOARD, 'rgba(0, 0, 0, 0.7)');
  paintBillBoard(BILL_BOARD_POSITION_X, BILL_BOARD_POSITION_Y, WIDTH_BILL_BOARD, HEIGHT_BILL_BOARD, 'white');

  // Задаем параментры для текста
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = FONT_SIZE + 'px ' + FONT_TYPE;
  ctx.textBaseline = 'hanging';

  // Отрисовываем первую строчку
  var drawPositionX = BILL_BOARD_POSITION_X + PADDING_LEFT;
  var drawPositionY = BILL_BOARD_POSITION_Y + PADDING_TOP;
  ctx.fillText('Ура вы победили!', drawPositionX, drawPositionY);

  // Отрисовываем вторую строчку
  drawPositionY += FONT_SIZE + VERTICAL_WHITE_SPACE;
  ctx.fillText('Список результатов:', drawPositionX, drawPositionY);

  // Объявляем массив для объектов
  var columns = [];
  // Вычесляем маштаб
  var scaleMultiplyer = HEIGHT_DIAGRAM_BAR_MAX / getMaxFromArray(times);
  for (var i = 0; i < times.length; i++) {
    // Создаем массив объектов
    columns[i] = {
      timeStartAnimation: 0,
      duration: 0,
      commonX: 0,
      scoreTextPositionY: 0,
      barBottomPositionY: 0,
      heightBar: 0,
      text: '',
      color: 'black',
      isAnimation: true,
      drawText: function () {
        ctx.fillStyle = TEXT_COLOR;
        ctx.fillText(this.text, this.commonX, this.scoreTextPositionY);
      },
      movieMaker: function () {
        var currentHeight = Math.floor(this.heightBar * ((Date.now() - this.timeStartAnimation) / this.duration));
        if (currentHeight >= this.heightBar) {
          this.isAnimation = false;
          currentHeight = this.heightBar;
          this.drawText();
        }
        ctx.fillStyle = this.color;
        var currentY = this.barBottomPositionY - currentHeight;
        paintDiagramBar(this.commonX, currentY, WIDTH_DIAGRAM_BAR, currentHeight, this.color);
      }
    };
    // Задаем время анимации одной колонки
    columns[i].duration = ANIMATION_DURATION_MILLISEC / times.length;
    // Вычесляем высоту столбца
    columns[i].heightBar = Math.round(times[i] * scaleMultiplyer);
    // Вычесляем координату "У" для строки отображающей затраченое время
    var downShift = HEIGHT_DIAGRAM_BAR_MAX - columns[i].heightBar;
    columns[i].scoreTextPositionY = DIAGRAM_BLOCK_POSITION_Y + downShift;
    // Координата "Х" для столбца
    columns[i].commonX = DIAGRAM_BLOCK_POSITION_X + (WIDTH_DIAGRAM_BAR + SPACE_DIGRAM_BAR) * i;
    // Время игрока в формате текста.
    columns[i].text = Math.floor(times[i]) + '';
    // Вычесляем координату "У" нижнего основания столбика диаграммы
    columns[i].barBottomPositionY = DIAGRAM_BLOCK_POSITION_Y + FONT_SIZE + VERTICAL_WHITE_SPACE + HEIGHT_DIAGRAM_BAR_MAX;
    // Назначаем чвета столбиков диаграммы для различных игроков
    columns[i].color = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : ('rgba(0, 0, ' + Math.floor(Math.random() * 255) + ', 1)');
    // Отрисовываем имена игроков
    ctx.fillStyle = TEXT_COLOR;
    drawPositionY = columns[i].barBottomPositionY + VERTICAL_WHITE_SPACE * 2;
    ctx.fillText(names[i], columns[i].commonX, drawPositionY);
  }

  // Функция для анимации отображения результатов
  var draw = function () {
    for (i = 0; i < names.length; i++) {
      if (!columns[i].timeStartAnimation) {
        columns[i].timeStartAnimation = Date.now();
      }
      if (columns[i].isAnimation) {
        columns[i].movieMaker();
        break;
      }
    }
    if (!columns[names.length - 1].isAnimation) {
      return;
    }
    window.requestAnimationFrame(draw);
  };
  // Вызов анимации
  window.requestAnimationFrame(draw);
};
