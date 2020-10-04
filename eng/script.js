const cardContainer = document.querySelector('.cards');
const cards = {
    left: cardContainer.children[0],
    center: cardContainer.children[1],
    right: cardContainer.children[2],
};
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

const url = '../dicts/';
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

getData('eng').then(() => {
    const i1 = randNum(data['eng'].length);
    const i2 = randNum(data['eng'].length);
    indexes['eng'].push(i1, i2);

    cards.left.innerHTML = null;
    cards.center.innerHTML = data['eng'][i1];
    cards.right.innerHTML = data['eng'][i2];
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
    indexPrev = indexes['eng'][indexes['eng'].length - 3 - offsetBack];
    cardContainer.prepend(cards.right);
    updateLinks();
    cards.left.innerHTML = data['eng'][indexPrev];
    if (!indexPrev) {
        btnPrev.disabled = true;
    }
}

function moveNext() {
    let indexNext;

    if (offsetBack > 0) {
        offsetBack--;
        indexNext = indexes['eng'][indexes['eng'].length - 1 - offsetBack];
    } else {
        indexNext = randNum(data['eng'].length); // Create and push new index
        indexes['eng'].push(indexNext);
    }
    cardContainer.append(cards.left); // Shift cards left
    updateLinks();
    cards.right.textContent = data['eng'][indexNext]; // Set text of right card
    btnPrev.disabled = false;
}
