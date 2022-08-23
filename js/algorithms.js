import ancients from '../assets/Ancients/ancients.js';

let ancientsClass = document.querySelector('.ancients');
let row = document.createElement('div');
row.classList.add('row');
ancientsClass.appendChild(row);

ancients.forEach(element => {
    let ancientImg = `<img src="assets/Ancients/${element}.png" width="85%" alt="${element}">`;
    let ancientCol = document.createElement('div');
    ancientCol.classList.add('col-3');
    row.appendChild(ancientCol);

    let ancient = document.createElement('div');
    ancient.classList.add(element);

    ancient.innerHTML = ancientImg;
    ancientCol.appendChild(ancient);
});
