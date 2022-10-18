const cardContainer = document.querySelector('.cards');
const cards = {
    left: cardContainer.children[0],
    center: cardContainer.children[1],
    right: cardContainer.children[2],
};
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

const url = '../dicts/ukr_adv.txt';

let data = [];
const indexes = [];
let offsetBack = 0;

getData().then(() => {
    const i1 = randNum(data.length);
    const i2 = randNum(data.length);
    indexes.push(i1, i2);

    cards.left.innerHTML = null;
    cards.center.innerHTML = data[i1];
    cards.right.innerHTML = data[i2];
});

btnPrev.addEventListener('click', moveBack);
btnNext.addEventListener('click', moveNext);

function randNum(max) {
    return Math.floor(Math.random() * max);
}

function getData() {
    return fetch(url)
        .then((response) => response.text())
        .then((text) => {
            data = text.split('\n');
        });
}

function updateLinks() {
    cards.left = cardContainer.children[0];
    cards.center = cardContainer.children[1];
    cards.right = cardContainer.children[2];
}

function moveBack() {
    offsetBack++;
    indexPrev = indexes[indexes.length - 3 - offsetBack];
    cardContainer.prepend(cards.right);
    updateLinks();
    cards.left.innerHTML = data[indexPrev];
    if (!indexPrev) {
        btnPrev.disabled = true;
    }
}

function moveNext() {
    let indexNext;

    if (offsetBack > 0) {
        offsetBack--;
        indexNext = indexes[indexes.length - 1 - offsetBack];
    } else {
        indexNext = randNum(data.length); // Create and push new index
        indexes.push(indexNext);
    }
    cardContainer.append(cards.left); // Shift cards left
    updateLinks();
    cards.right.textContent = data[indexNext]; // Set text of right card
    btnPrev.disabled = false;
}
