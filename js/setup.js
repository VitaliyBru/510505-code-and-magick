'use strict';

var QUANTITY_SIMILAR_WIZARDS = 4;
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
      'name': '',
      'coatColor': '',
      'eyesColor': ''
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
  var i = Math.floor(Math.random() * array.length);
  return array[i];
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

// Разблокируем показ слоя класса «overlay setup»
var overlaySetup = document.querySelector('.setup');
overlaySetup.classList.remove('hidden');

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
