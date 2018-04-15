'use strict';

var QUANTITY_SIMILAR_WIZARDS = 4;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var choicesList = {
  firstNames: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],
  lastNames: [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ],
  coatColors: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],
  eyesColors: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ],

  getWizard: function () {
    var wizard = {
      name: '',
      coatColor: '',
      eyesColor: ''
    };

    wizard['name'] = getRandElementArray(this.firstNames) + ' '
    + getRandElementArray(this.lastNames);
    wizard['coatColor'] = getRandElementArray(this.coatColors);
    wizard['eyesColor'] = getRandElementArray(this.eyesColors);
    return wizard;
  }
};

// Возвращает случайный элемент массива
var getRandElementArray = function (array) {
  var index = Math.floor(Math.random() * array.length);
  return array[index];
};

// Возвращает массив из случано сгенерированных вомшебников
var getSimilarWizards = function (length) {
  var similarWizards = [];
  for (var i = 0; i < length; i++) {
    similarWizards[i] = choicesList.getWizard();
  }
  return similarWizards;
};

// Возвращает элемент созданный на базе шаблона и
// наполняет его необходимым контентом
var getTemplateClone = function (template, wizard) {
  var clone = template.cloneNode(true);
  clone.querySelector('.setup-similar-label').textContent = wizard['name'];
  clone.querySelector('.wizard-coat').style.fill = wizard['coatColor'];
  clone.querySelector('.wizard-eyes').style.fill = wizard['eyesColor'];
  return clone;
};

// ////////////////////////////////
// Скрытие и показ окна настроек //
// ////////////////////////////////
// Закрытие popup-а по клику на элементе
var onCloseTriggerClick = function () {
  overlaySetup.classList.add('hidden');
  removeListenersForClose();
};
// Закрытие popup-а клавишей ESC
var onDocumentEscKeydown = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    overlaySetup.classList.add('hidden');
    removeListenersForClose();
  }
};
// Зкрытие popup-а нажатием ввод на элементе
var onCloseTriggerEnterKeydown = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    overlaySetup.classList.add('hidden');
    removeListenersForClose();
  }
};
// Предотвращает закрытие popup-а по ESC если элемент выбран
var onNameInputEscKeydown = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
};
// Функция добавляет слушатели на popup настроек
var addListenersForClose = function () {
  closeSetupTrigger.addEventListener('click', onCloseTriggerClick);
  closeSetupTrigger.addEventListener('keydown', onCloseTriggerEnterKeydown);
  document.addEventListener('keydown', onDocumentEscKeydown);
  inputName.addEventListener('keydown', onNameInputEscKeydown);
};
// Функция удаляет слушатели с popup-а настроек
var removeListenersForClose = function () {
  closeSetupTrigger.removeEventListener('click', onCloseTriggerClick);
  closeSetupTrigger.removeEventListener('keydown', onCloseTriggerEnterKeydown);
  document.removeEventListener('keydown', onDocumentEscKeydown);
  inputName.removeEventListener('keydown', onNameInputEscKeydown);
};
// popup настроек
var overlaySetup = document.querySelector('.setup');
// Триггер открытия popup-а
var openSetupTrigger = document.querySelector('.setup-open');
// Триггер скрытия popup-а
var closeSetupTrigger = overlaySetup.querySelector('.setup-close');
// Поле ввода имени персонажа
var inputName = overlaySetup.querySelector('#username');

openSetupTrigger.addEventListener('click', function () {
  overlaySetup.classList.remove('hidden');
  addListenersForClose();
});
openSetupTrigger.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    overlaySetup.classList.remove('hidden');
    addListenersForClose();
  }
});

// ////////////////////////////////////
// Отображение «похожих волшебников» //
// ////////////////////////////////////
// Получаем шаблон
var template = document.querySelector('#similar-wizard-template')
    .content.querySelector('div');
// Подготавливаем элементы для вставки в ДОМ
var fragment = document.createDocumentFragment();
var similarWizards = getSimilarWizards(QUANTITY_SIMILAR_WIZARDS);
for (var i = 0; i < similarWizards.length; i++) {
  fragment.appendChild(getTemplateClone(template, similarWizards[i]));
}
// Добавляем полученный блок «fragment» в ДОМ
document.querySelector('.setup-similar-list').appendChild(fragment);
// Отменяем скрытие блока «setup-similar»
overlaySetup.querySelector('.setup-similar').classList.remove('hidden');

// ///////////////////////////////////
// Настройтка цвета глаз и фаербола //
// ///////////////////////////////////
var QUANTITY_BASE_COLOR = 3;
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
// Возвращает следующий за текущим элемент из массива (массив зациклин)
var getNextColor = function (colorList, currentColor) {
  var nextIndex = 1;
  if (currentColor) {
    nextIndex = (colorList.indexOf(currentColor) + 1) % colorList.length;
  }
  return colorList[nextIndex];
};
// Возвращает цвет в шестнадцатиричном формате из rgb
var convertRgbToHex = function (rgb) {
  rgb = rgb.match(/(\d+)/g);
  var hexColor = null;
  if (rgb) {
    hexColor = '#';
    // var убран по тербованию теревиса
    for (i = 0; i < QUANTITY_BASE_COLOR; i++) {
      hexColor += parseInt(rgb[i], 10).toString(16);
    }
  }
  return hexColor;
};

// Получаем контейнер содержащий настройки персонажа
var setupPlayerElement = document.querySelector('.setup-player');
// Находим элемент «глаза» персонажа
var eyesColorInputElement = setupPlayerElement.querySelector('#eyes-color');
// Вешаем слушатель на глаза
setupPlayerElement.querySelector('.wizard-eyes').addEventListener(
    'click',
    function (evt) {
      // Меняем цвет глаз
      evt.target.style.fill = getNextColor(eyesColors, evt.target.style.fill);
      // Передаем новый цвет глаз в поле input
      eyesColorInputElement.value = evt.target.style.fill;
    }
);

// Находим элемент fireball
var fireballColorInput = setupPlayerElement.querySelector('#fireball-color');
// Вешаем на fireball слушатель
setupPlayerElement.querySelector('.setup-fireball').addEventListener(
    'click',
    function (evt) {
      // Передаем новый цвет в поле input
      fireballColorInput.value = getNextColor(fireballColors,
          convertRgbToHex(evt.target.style.backgroundColor));
      // Меняем цвет fireball-а
      evt.target.style.backgroundColor = fireballColorInput.value;
    }
);
