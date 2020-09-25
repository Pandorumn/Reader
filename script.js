const cardContainer = document.querySelector('.cards');
const cards = {
    left: cardContainer.children[0],
    center: cardContainer.children[1],
    right: cardContainer.children[2],
};
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

const url = './dicts/';
// const url = 'https://klava.org/delta/dicts/';
// const url = 'gs://react-my-burger-10-a7502.appspot.com/';

const data = {
    rus: [],
    eng: [],
};
const indexes = {
    rus: [],
    eng: [],
};
let offsetBack = 0;

getData('rus').then(() => {
    const i1 = randNum(data['rus'].length);
    const i2 = randNum(data['rus'].length);
    indexes['rus'].push(i1, i2);

    cards.left.textContent = null;
    cards.center.textContent = data['rus'][i1];
    cards.right.textContent = data['rus'][i2];
});
// getData('eng');

btnPrev.addEventListener('click', moveBack);
btnNext.addEventListener('click', moveNext);

function randNum(max) {
    return Math.floor(Math.random() * max);
}

function getData(lang) {
    return fetch(url + `${lang}_adv.txt`)
        .then((response) => response.text())
        .then((text) => {
            data[lang] = text.split('\n');
        });
}

function updateLinks() {
    cards.left = cardContainer.children[0];
    cards.center = cardContainer.children[1];
    cards.right = cardContainer.children[2];
}

function moveBack() {
    offsetBack++;
    indexPrev = indexes['rus'][indexes['rus'].length - 3 - offsetBack];
    cardContainer.prepend(cards.right);
    updateLinks();
    cards.left.textContent = data['rus'][indexPrev];
    if (!indexPrev) {
        btnPrev.disabled = true;
    }
}

function moveNext() {
    let indexNext;

    if (offsetBack > 0) {
        offsetBack--;
        indexNext = indexes['rus'][indexes['rus'].length - 1 - offsetBack];
    } else {
        indexNext = randNum(data['rus'].length); // Create and push new index
        indexes['rus'].push(indexNext);
    }
    cardContainer.append(cards.left); // Shift cards left
    updateLinks();
    cards.right.textContent = data['rus'][indexNext]; // Set text of right card
    btnPrev.disabled = false;
}
