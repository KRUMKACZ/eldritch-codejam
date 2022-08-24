import ancients from '../assets/Ancients/ancients.js';
import mythDeck from './mythDeck.js';

import greenCardsData from './greenCard.js';
import brownCardsData from './brownCard.js';
import blueCardsData from './blueCard.js';

console.log(greenCardsData);


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
            selectCardValue = el;
            addRadioButton();
        } else {
            propCardList[index].firstChild.classList.remove('active-card');
        }
    });
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
<div class="col-4"><input id="easy" class="easy" name="complexity" type="radio" value="easy"><label for="easy" class="radio-style"> Легкая</label></div>
<div class="col-4"><input id="medium" class="medium" name="complexity" type="radio" value="medium"><label for="medium" class="radio-style"> Среднаяя</label></div>
<div class="col-4"><input id="hard" class="hard" name="complexity" type="radio" value="hard"><label for="hard" class="radio-style"> Тяжелая</label></div>`;
}

let complexity = '';
complexityClass.addEventListener('click', (event) => {
    complexity = event.target.value;
    if (selectCardValue != '' && complexity != undefined) {
        mixUp.innerHTML = `<div class="col-md-6 offset-md-3 mix-up__button"><span class="mix-button">Замешать колоду</span></div>`;
        /*
                console.log('Вы выбрали: ' + selectCardValue);
                console.log('Сложность: ' + complexity);
        */
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getMythDeck(selectCardValue) {
    let mythDeckClass = document.querySelector('.myth-deck');

    mythDeck[selectCardValue].forEach((el, index) => {

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

        if (Array.isArray(el)) {
            el.forEach((el, index) => {
                switch (index) {
                    case 0:
                        green.textContent = el;
                        dotsContainer.appendChild(green);
                        break;
                    case 1:
                        brown.textContent = el;
                        dotsContainer.appendChild(brown);
                        break;
                    case 2:
                        blue.textContent = el;
                        dotsContainer.appendChild(blue);
                        break;
                }
            });
        }
    });
}

function getCardAlgoritm() {

    console.log('Вы выбрали: ' + selectCardValue);
    console.log('Сложность: ' + complexity);

    if (selectCardValue == 'cthulthu' && complexity == 'easy') {

    }
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
        getMythDeck(selectCardValue);
    }
});

function showAndRemoveCard() {
    
}


window.addEventListener('click', (event) => {
    if (event.target.alt == 'click-card') {
        showAndRemoveCard();
    }
});