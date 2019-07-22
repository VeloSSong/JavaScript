const rival_Deck = document.getElementById('rival-deck');
const my_Deck = document.getElementById('my-deck');
const rival_hero = document.getElementById('rival-hero');
const my_hero = document.getElementById('my-hero');
let rivalDeck_Data = [];
let myDeck_Data = [];
let rivalHero_Data;
let myHero_Data;

function card_Connect(d, pos, hero) {
    const card = document.querySelector('.card-hidden .card').cloneNode(true);   // cloneNode는 html 을 복사 인자로 true 주면 안에 내용까지 복사
    card.querySelector('.card-cost').textContent = d.cost;
    card.querySelector('.card-att').textContent = d.att;
    card.querySelector('.card-hp').textContent = d.hp;
    pos.appendChild(card);

    if(hero) {
        card.querySelector('.card-cost').style.display = 'none';
        const name = document.createElement('div');
        name.textContent = '영웅';
        card.appendChild(name);
    }
}
function rivalDeck(num) {
    for(let i = 0; i < num; i++) {
        rivalDeck_Data.push(factory());
    }
    rivalDeck_Data.forEach(d => {
        card_Connect(d, rival_Deck);
    })
    
}
function myDeck(num) {
    for(let i = 0; i < num; i++) {
        myDeck_Data.push(factory());
    }
    myDeck_Data.forEach(d => {
        card_Connect(d, my_Deck);
    })
}
function rivalHero() {
    rivalHero_Data = factory(true);
    card_Connect(rivalHero_Data, rival_hero, true);
}
function myHero() {
    myHero_Data = factory(true);
    card_Connect(myHero_Data, my_hero, true)
}

function Card(hero) {
    if(hero){
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.hero = true;
    }
    else {
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2);
    }
}

function factory(hero) {
    return new Card(hero);
}

function init() {
    rivalDeck(5);
    myDeck(5);
    rivalHero();
    myHero();
}

init();