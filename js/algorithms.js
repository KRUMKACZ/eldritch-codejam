import ancients from '../assets/Ancients/ancients.js';
import mythDeck from './mythDeck.js';

import greenCardsDataArr from './greenCard.js';
import brownCardsDataArr from './brownCard.js';
import blueCardsDataArr from './blueCard.js';

let greenCardsData,
    brownCardsData,
    blueCardsData,
    showRandomCard;

function importDataCard() {
    greenCardsData = JSON.parse(JSON.stringify(greenCardsDataArr));
    brownCardsData = JSON.parse(JSON.stringify(brownCardsDataArr));
    blueCardsData = JSON.parse(JSON.stringify(blueCardsDataArr));
    console.log('Данные обновлены!');
    console.log('--------------------------------/');
}

let ancientsClass = document.querySelector('.ancients');
let complexityClass = document.querySelector('.complexity');
let mixUp = document.querySelector('.mix-up');

ancients.forEach((element) => {
    let ancientImg = `<img src="assets/Ancients/${element}.png" width="85%" alt="${element}">`;
    let ancientCol = document.createElement('div');
    ancientCol.classList.add('col-3', 'card');
    ancientsClass.appendChild(ancientCol);

    let ancient = document.createElement('div');
    ancient.classList.add(element);

    ancient.innerHTML = ancientImg;
    ancientCol.appendChild(ancient);
});

let cthulthu = document.querySelector('.cthulthu');
let shubNiggurath = document.querySelector('.shubNiggurath');
let logSothoth = document.querySelector('.iogSothoth');
let azathoth = document.querySelector('.azathoth');

const nameCardList = ['cthulthu', 'shubNiggurath', 'iogSothoth', 'azathoth'];
const propCardList = [cthulthu, shubNiggurath, logSothoth, azathoth];


let selectCardValue = '';

function classToggle(selectCard) {
    importDataCard(); // Обновляем значения данных карт после выбора новой карты
    nameCardList.forEach((el, index) => {
        if (el == selectCard) {
            let mixResultClass = document.querySelector('.mix-result');
            let mixUpButton = document.querySelector('.mix-up__button');
            if (mixResultClass) {
                mixResultClass.remove();
            }
            if (mixUpButton) {
                mixUpButton.remove();
            }
            propCardList[index].firstChild.classList.add('active-card');
            selectCardValue = el; // Сохраняем выбранную карту
        } else {
            propCardList[index].firstChild.classList.remove('active-card');
        }
    });
    addRadioButton(); // Добавляем выбор сложности после выбора карты древнего
}


let container = document.querySelector('.ancients');
container.addEventListener('click', (event) => {
    let selectCard = event.target.alt;
    switch (selectCard) {
        case 'cthulthu':
            classToggle(selectCard);
            break;
        case 'shubNiggurath':
            classToggle(selectCard);
            break;
        case 'iogSothoth':
            classToggle(selectCard);
            break;
        case 'azathoth':
            classToggle(selectCard);
            break;
        default:
            break;
    }
});

function addRadioButton() {
    complexityClass.innerHTML = `
<div class="col-2"><input id="easy" class="easy" name="complexity" type="radio" value="easy"><label for="easy" class="radio-style"> Очень легкий</label></div>
<div class="col-2"><input id="easy-plus" class="easy-plus" name="complexity" type="radio" value="easy-plus"><label for="easy-plus" class="radio-style"> Легкий</label></div>
<div class="col-2"><input id="normal" class="normal" name="complexity" type="radio" value="normal"><label for="normal" class="radio-style"> Средний</label></div>
<div class="col-2"><input id="hard-min" class="hard-min" name="complexity" type="radio" value="hard-min"><label for="hard-min" class="radio-style"> Тяжелый</label></div>
<div class="col-2"><input id="hard" class="hard" name="complexity" type="radio" value="hard"><label for="hard" class="radio-style">Очень тяжелый</label></div>`;
}


// Выбираем сложность и добавляем кнопку замешивания колоды
let complexity = '';

complexityClass.addEventListener('click', (event) => {
    complexity = event.target.value;
    if (selectCardValue != '' && complexity != undefined) {
        mixUp.innerHTML = `<div class="col-md-6 offset-md-3 mix-up__button"><span class="mix-button">Замешать колоду</span></div>`;
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function updateCountCard(cardsArrayStage) {
    let mythDeckClass = document.querySelector('.myth-deck');

    while (mythDeckClass.firstChild) {
        mythDeckClass.removeChild(mythDeckClass.firstChild);
    }

    cardsArrayStage.forEach((el, index) => {
        let stageContainer = document.createElement('div');
        stageContainer.classList.add('stage-container');

        let stageText = document.createElement('span');
        stageText.classList.add('stage-text');

        let dotsContainer = document.createElement('div');
        dotsContainer.classList.add('dots-container');

        let green = document.createElement('div');
        green.classList.add('dot', 'green');

        let brown = document.createElement('div');
        brown.classList.add('dot', 'brown');

        let blue = document.createElement('div');
        blue.classList.add('dot', 'blue');

        mythDeckClass.appendChild(stageContainer);
        stageContainer.appendChild(stageText);
        stageText.textContent = `${index + 1} стадия`;
        stageContainer.appendChild(dotsContainer);

        green.textContent = el.green.length;
        dotsContainer.appendChild(green);

        brown.textContent = el.brown.length;
        dotsContainer.appendChild(brown);

        blue.textContent = el.blue.length;
        dotsContainer.appendChild(blue);
    });
}


// Генерируем случайное число
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум и минимум включаются
}

// Удаляем из общего массива карту, добавленную в сгенерированный массив для игры
function deletedAddCard(subarray, idCard) {
    let cardIndex = subarray.indexOf(idCard);
    if (cardIndex !== -1) {
        subarray.splice(cardIndex, 1);
    }
}


function deletedCard(randomArrCard, folderCard) {
    let positionCard = Math.floor(Math.random() * randomArrCard.length);
    showRandomCard = randomArrCard[positionCard];
    console.log('Рандомная карта: ' + showRandomCard);
    console.log('///////////////////////////////////////////////////////');
    let showRandomCardContainer = document.querySelector('.get-card');

    showRandomCardContainer.innerHTML = `<img src='./assets/MythicCards/${folderCard}/${showRandomCard}.png' width='50%' alt='select-card'>`;
    randomArrCard.splice(positionCard, 1);
}


// Генерируем коллецию карт для игры (трех этапов)
function collectArrayCardsEasyHard(el) {

    let stageArray = {
        green: [],
        brown: [],
        blue: []
    };

    el.forEach((el, index) => { // Получаем элементы подмассива 
        // Формируем кол-во иттераций для выборки карт [green, brown, blue]
        let subarray,
            idCard;

        if (index == 0) { // Первая иттерация подмассива [0]
            for (let i = 0; i < el; i++) {
                if (greenCardsData[complexity] == 0) { // Добираем обычные карты
                    complexity = 'normal';
                }
                let randomNum = getRandomIntInclusive(0, greenCardsData[complexity].length);
                subarray = greenCardsData[complexity];
                idCard = greenCardsData[complexity][randomNum];
                stageArray['green'].push(idCard);

                deletedAddCard(subarray, idCard);
            }
        }
        if (index == 1) { // Вторая иттерация подмассива [2]
            for (let i = 0; i < el; i++) {
                if (brownCardsData[complexity] == 0) { // Добираем обычные карты
                    complexity = 'normal';
                }
                let randomNum = getRandomIntInclusive(0, brownCardsData[complexity].length);
                subarray = brownCardsData[complexity];
                idCard = brownCardsData[complexity][randomNum];
                stageArray['brown'].push(brownCardsData[complexity][randomNum]);

                deletedAddCard(subarray, idCard);
            }
        }
        if (index == 2) { // Третья иттерация подмассива [2]
            for (let i = 0; i < el; i++) {
                if (blueCardsData[complexity] == 0) { // Добираем обычные карты
                    complexity = 'normal';
                }
                let randomNum = getRandomIntInclusive(0, blueCardsData[complexity].length);
                subarray = blueCardsData[complexity];
                idCard = blueCardsData[complexity][randomNum];
                stageArray['blue'].push(blueCardsData[complexity][randomNum]);

                deletedAddCard(subarray, idCard);
            }
        }
    });
    return stageArray;
}


function collectArrayCardsNormal(el) {

    let stageArray = {
        green: [],
        brown: [],
        blue: []
    };

    function randomKeysDifficulty() {
        let keysDifficulty = Object.keys(greenCardsData);
        let positionKeys = Math.floor(Math.random() * Object.keys(greenCardsData).length);
        complexity = keysDifficulty[positionKeys]; // Рандомный уровень сложности карт  
        return complexity;
    }


    el.forEach((el, index) => { // Получаем элементы подмассива 
        // Формируем кол-во иттераций для выборки карт [green, brown, blue]
        let subarray,
            idCard;

        // Собираем первую колоду карт
        if (index == 0) { // Первая иттерация подмассива [0]
            for (let i = 0; i < el; i++) {
                randomKeysDifficulty();

                console.log('---Рандомный уровень сложности зеленых карт----');
                console.log(complexity);
                console.log('-------------------------------------');

                if (greenCardsData[complexity] == 0) { // Добираем обычные карты
                    complexity = randomKeysDifficulty();
                }

                let randomNum = getRandomIntInclusive(0, greenCardsData[complexity].length);
                subarray = greenCardsData[complexity];
                idCard = greenCardsData[complexity][randomNum];
                stageArray['green'].push(idCard);

                deletedAddCard(subarray, idCard);
            }
        }
        // Собираем вторую колоду карт
        if (index == 1) { // Вторая иттерация подмассива [1]
            for (let i = 0; i < el; i++) {
                randomKeysDifficulty();

                if (brownCardsData[complexity] == 0) { // Добираем обычные карты
                    complexity = randomKeysDifficulty();
                }

                let randomNum = getRandomIntInclusive(0, brownCardsData[complexity].length);
                subarray = brownCardsData[complexity];
                idCard = brownCardsData[complexity][randomNum];
                stageArray['brown'].push(idCard);

                deletedAddCard(subarray, idCard);
            }
        }
        // Собираем третью колоду карт
        if (index == 2) { // Третья иттерация подмассива [2]
            for (let i = 0; i < el; i++) {
                randomKeysDifficulty();

                if (blueCardsData[complexity] == 0) { // Добираем обычные карты
                    complexity = randomKeysDifficulty();
                }

                let randomNum = getRandomIntInclusive(0, blueCardsData[complexity].length);
                subarray = blueCardsData[complexity];
                idCard = blueCardsData[complexity][randomNum];
                stageArray['blue'].push(idCard);

                deletedAddCard(subarray, idCard);
            }
        }
    });
    return stageArray;
}

function collectArrayCardsPlusMin(el) {

    let stageArray = {
        green: [],
        brown: [],
        blue: []
    };

    // Учитывая одноименные уровни сложности карт, выборка производится из greenCardsData
    function randomKeysDifficulty() {
        let keysDifficulty = Object.keys(greenCardsData);
        let positionKeys = Math.floor(Math.random() * Object.keys(greenCardsData).length);
        complexity = keysDifficulty[positionKeys]; // Рандомный уровень сложности карт  
        return complexity;
    }


    el.forEach((el, index) => { // Получаем элементы подмассива 
        // Формируем кол-во иттераций для выборки карт [green, brown, blue]
        let subarray,
            idCard;

        // Собираем первую колоду карт
        if (index == 0) { // Первая иттерация подмассива [0]
            for (let i = 0; i < el; i++) {
                randomKeysDifficulty();

                console.log('---Рандомный уровень сложности зеленых карт----');
                console.log(complexity);
                console.log('-------------------------------------');

                if (greenCardsData[complexity] == 0) { // Добираем обычные карты
                    complexity = randomKeysDifficulty();
                }

                let randomNum = getRandomIntInclusive(0, greenCardsData[complexity].length);
                subarray = greenCardsData[complexity];
                idCard = greenCardsData[complexity][randomNum];
                stageArray['green'].push(idCard);

                deletedAddCard(subarray, idCard);
            }
        }
        // Собираем вторую колоду карт
        if (index == 1) { // Вторая иттерация подмассива [1]
            for (let i = 0; i < el; i++) {
                randomKeysDifficulty();

                if (brownCardsData[complexity] == 0) { // Добираем обычные карты
                    complexity = randomKeysDifficulty();
                }

                let randomNum = getRandomIntInclusive(0, brownCardsData[complexity].length);
                subarray = brownCardsData[complexity];
                idCard = brownCardsData[complexity][randomNum];
                stageArray['brown'].push(idCard);

                deletedAddCard(subarray, idCard);
            }
        }
        // Собираем третью колоду карт
        if (index == 2) { // Третья иттерация подмассива [2]
            for (let i = 0; i < el; i++) {
                randomKeysDifficulty();

                if (blueCardsData[complexity] == 0) { // Добираем обычные карты
                    complexity = randomKeysDifficulty();
                }

                let randomNum = getRandomIntInclusive(0, blueCardsData[complexity].length);
                subarray = blueCardsData[complexity];
                idCard = blueCardsData[complexity][randomNum];
                stageArray['blue'].push(idCard);

                deletedAddCard(subarray, idCard);
            }
        }
    });
    return stageArray;
}


// Функция формирующая матрицу выборки карт согласно выбранной сложности
let cardsArrayStage = []; // Создаем пустой массив для карт
let stageArray;
function getCardAlgoritm() {

    console.log('Вы выбрали: ' + selectCardValue);
    console.log('Сложность: ' + complexity);
    console.log('-------------------------------------');

    cardsArrayStage = []; // Пересоздаем пустой массив, в случае выбора новой карты

    switch (complexity) {
        case 'easy':
            mythDeck[selectCardValue].forEach((el) => { // Получаем подмассив колоды мифов выбранного древнего
                if (Array.isArray(el)) { // Перебираем подмассив формируя коллецию карт
                    stageArray = collectArrayCardsEasyHard(el);
                    cardsArrayStage.push(stageArray);
                }
            });
            break;

        case 'easy-plus':
            mythDeck[selectCardValue].forEach((el) => { // Получаем подмассив колоды мифов выбранного древнего
                if (Array.isArray(el)) { // Перебираем подмассив формируя коллецию карт
                    stageArray = collectArrayCardsPlusMin(el);
                    cardsArrayStage.push(stageArray);
                }
            });
            break;

        case 'normal':
            mythDeck[selectCardValue].forEach((el) => { // Получаем подмассив колоды мифов выбранного древнего
                if (Array.isArray(el)) { // Перебираем подмассив формируя коллецию карт
                    stageArray = collectArrayCardsNormal(el);
                    cardsArrayStage.push(stageArray);
                }
            });
            break;

        case 'hard-min':
            mythDeck[selectCardValue].forEach((el) => { // Получаем подмассив колоды мифов выбранного древнего
                if (Array.isArray(el)) { // Перебираем подмассив формируя коллецию карт
                    stageArray = collectArrayCardsPlusMin(el);
                    cardsArrayStage.push(stageArray);
                }
            });
            break;

        case 'hard':
            mythDeck[selectCardValue].forEach((el) => { // Получаем подмассив колоды мифов выбранного древнего
                if (Array.isArray(el)) { // Перебираем подмассив формируя коллецию карт
                    stageArray = collectArrayCardsEasyHard(el);
                    cardsArrayStage.push(stageArray);
                }
            });
            break;
    }

    /*
        console.log('------------Коллекция карт--------------');
        console.log(cardsArrayStage);
        console.log('-------------------------------------');
    */

    updateCountCard(cardsArrayStage); // Вызываем функцию перебора массива и отображения данных по стадиям игры
}


mixUp.addEventListener('click', (event) => {
    if (event.target.className == 'mix-button') {
        if (selectCardValue != '' && complexity != '') {
            mixUp.innerHTML = `
            <div class="row justify-content-center mix-result">
            <div class="col-3">
                Схема колоды мифов
                <div class="myth-deck">
                </div>
            </div>
            <div class="col-3">
                Выбор карты
                <div class="click-card">
                <img src="assets/img/mythicCardBackground.png" width="50%" alt="click-card">
                </div>
            </div>
            <div class="col-3">
                Полученная карта
                <div class="get-card">
                </div>
          </div>
          </div>`;
            getCardAlgoritm();
        } else {
            mixUp.innerHTML = `
            <div class="row justify-content-center">
                <div class="col-6">
                    Ошибка выбора!
                </div>
            </div>`;
        }
    }
});

let itter;
let indexStage = 0;

function updateItter() {
    switch (indexStage) {
        case 0:
            itter = cardsArrayStage[indexStage].green.length + cardsArrayStage[indexStage].brown.length + cardsArrayStage[indexStage].blue.length;
            break;
        case 1:
            itter = cardsArrayStage[indexStage].green.length + cardsArrayStage[indexStage].brown.length + cardsArrayStage[indexStage].blue.length;
            break;
        case 2:
            itter = cardsArrayStage[indexStage].green.length + cardsArrayStage[indexStage].brown.length + cardsArrayStage[indexStage].blue.length;
            break;
    }
}

function showAndRemoveCard() {
    updateItter();
    let keys = Object.keys(cardsArrayStage[indexStage]);
    let positionKeys = Math.floor(Math.random() * Object.keys(cardsArrayStage[indexStage]).length);
    let randomArrCard = cardsArrayStage[indexStage][keys[positionKeys]];
    let folderCard = keys[positionKeys];

    console.log('-Ключ-----------------*---*');
    console.log('Ключ: ' + keys[positionKeys]);
    console.log('----------------------------///');

    if (itter > 1) {
        if (randomArrCard.length != 0) {
            deletedCard(randomArrCard, folderCard);
        } else {
            showAndRemoveCard();
        }
    } else if (itter == 1) {
        if (randomArrCard.length != 0) {
            deletedCard(randomArrCard, folderCard);
            indexStage++;
        } else {
            showAndRemoveCard();
        }
    }

    updateItter();
    /*
        console.log("Стадия " + indexStage);
        console.log('----------------------------*---*');
        console.log(cardsArrayStage[indexStage]);
        console.log('----------------------------///');
    */
    updateCountCard(cardsArrayStage); // Обновляем состояние кол-ва карт

}


window.addEventListener('click', (event) => {
    if (event.target.alt == 'click-card') {
        showAndRemoveCard();
    }
});