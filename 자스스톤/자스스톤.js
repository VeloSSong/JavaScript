const rival = {
    Deck : document.getElementById('rival-deck'),
    hero : document.getElementById('rival-hero'),
    cards : document.getElementById('rival-cards'),
    cost : document.getElementById('rival-cost'),
    Deck_Data : [],
    Hero_Data : null
}
const my = {
    Deck : document.getElementById('my-deck'),
    hero : document.getElementById('my-hero'),
    cards : document.getElementById('my-cards'),
    cost : document.getElementById('my-cost'),
    Deck_Data : [],
    Hero_Data : null
}
const turn_btn = document.getElementById('turn-btn');
let turn = true;

function moveField(d, chk) {
    const sel = chk ? my : rival;
    if(sel.cost.textContent < d.cost) {
        return true;
    }
    const card_index = sel.Deck_Data.indexOf(d);
    sel.Deck_Data.splice(card_index, 1);
    card_Connect(d, sel.cards);          
    sel.Deck.innerHTML = '';
    sel.Deck_Data.forEach(d => {               
        card_Connect(d, sel.Deck);
    })
    d.field = true;
    sel.cost.textContent = sel.cost.textContent - d.cost;
}

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

    card.addEventListener('click', () => {
        if(turn) {
            if(!d.mine || d.field == true) {
                return;
            }
            if(!moveField(d, true)) {
                myDeck(1);
            }
        }
        else {
            if(d.mine || d.field == true) {
                return;
            }
            if(!moveField(d, false)) {
                rivalDeck(1);
            }
        }
    })
}

function rivalDeck(num) {
    for(let i = 0; i < num; i++) {
        rival.Deck_Data.push(factory());
    }
    rival.Deck.innerHTML = '';
    rival.Deck_Data.forEach(d => {
        card_Connect(d, rival.Deck);
    })
}

function myDeck(num) {
    for(let i = 0; i < num; i++) {
        my.Deck_Data.push(factory(false, true));
    }
    my.Deck.innerHTML = '';
    my.Deck_Data.forEach(d => {
        card_Connect(d, my.Deck);
    })
}

function rivalHero() {
    rival.Hero_Data = factory(true, false);
    card_Connect(rival.Hero_Data, rival.hero, true);
}

function myHero() {
    my.Hero_Data = factory(true, true);
    card_Connect(my.Hero_Data, my.hero, true)
}

function Card(hero, myCard) {
    if(hero){
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.hero = true;
        this.field = true;
    }
    else {
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2);
    }

    if(myCard) {
        this.mine = true;
    }
}

function factory(hero, myCard) {
    return new Card(hero, myCard);
}

function init() {
    rivalDeck(5);
    myDeck(5);
    rivalHero();
    myHero();
}

turn_btn.addEventListener('click', () => {
    turn = !turn;
    if(turn) {
        my.cost.textContent = 10;
    }
    else {
        rival.cost.textContent = 10;
    }
    document.getElementById('rival').classList.toggle('turn');
    document.getElementById('my').classList.toggle('turn');
})

init();