import ancients from '../assets/Ancients/ancients.js';
import mythDeck from './mythDeck.js';

console.log(mythDeck);

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

let cthulthu = document.querySelector('.Cthulthu');
let shubNiggurath = document.querySelector('.ShubNiggurath');
let logSothoth = document.querySelector('.IogSothoth');
let azathoth = document.querySelector('.Azathoth');

const nameCardList = ['Cthulthu', 'ShubNiggurath', 'IogSothoth', 'Azathoth'];
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
        case 'Cthulthu':
            classToggle(selectCard);
            break;
        case 'ShubNiggurath':
            classToggle(selectCard);
            break;
        case 'IogSothoth':
            classToggle(selectCard);
            break;
        case 'Azathoth':
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

        console.log('Вы выбрали: ' + selectCardValue);
        console.log('Сложность: ' + complexity);
    }
});

mixUp.addEventListener('click', (event) => {
    if (event.target.className == 'mix-button') {
        if (selectCardValue != '' && complexity != '') {
            mixUp.innerHTML = `
            <div class="row justify-content-center mix-result">
            <div class="col-3">
                Схема колоды мифов
            </div>
            <div class="col-3">
                Выбор карты
            </div>
            <div class="col-3">
                Полученная карта
          </div>
          </div>`;
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