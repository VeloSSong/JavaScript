const rival = {
    Deck : document.getElementById('rival-deck'),
    hero : document.getElementById('rival-hero'),
    cards : document.getElementById('rival-cards'),
    cost : document.getElementById('rival-cost'),
    Deck_Data : [],
    Field_Data : [],
    Hero_Data : null,
    Select_Card : null,
    Select_CardData : null
}
const my = {
    Deck : document.getElementById('my-deck'),
    hero : document.getElementById('my-hero'),
    cards : document.getElementById('my-cards'),
    cost : document.getElementById('my-cost'),
    Deck_Data : [],
    Field_Data : [],
    Hero_Data : null,
    Select_Card : null,
    Select_CardData : null
}
const turn_btn = document.getElementById('turn-btn');
let turn = true;

function deckReDraw(sel) {
    sel.Deck.innerHTML = '';
    sel.Deck_Data.forEach(d => {               
        card_Connect(d, sel.Deck);
    })
}

function filedReDraw(sel) {
    sel.cards.innerHTML = '';
    sel.Field_Data.forEach(d => {
        card_Connect(d, sel.cards);
    })
}

function heroReDraw(sel) {
    sel.hero.innerHTML = '';
    card_Connect(sel.Hero_Data, sel.hero, true);
}

function moveField(d, chk) {
    const sel = chk ? my : rival;
    if(sel.cost.textContent < d.cost) {
        return true;
    }
    const card_index = sel.Deck_Data.indexOf(d);
    sel.Deck_Data.splice(card_index, 1);
    sel.Field_Data.push(d);
    card_Connect(d, sel.cards);         
    deckReDraw(sel)
    d.field = true;
    sel.cost.textContent = sel.cost.textContent - d.cost;
}

function reDraw(chk) {
    const sel = chk ? my : rival;
    deckReDraw(sel);
    filedReDraw(sel);
    heroReDraw(sel);
}

function turnAction(d, card, turn) {
    const where = turn ? my : rival;
    const where2 = turn ? rival : my;

    if (card.classList.contains('card-turnover')) {
        return;
    }

    if((turn ? !d.mine : d.mine) && where.Select_Card) {
        d.hp = d.hp - where.Select_CardData.att;
        where.Select_Card.classList.remove('card-selected');
        where.Select_Card.classList.add('card-turnover');
        if(d.hp <= 0) {
            const card_index = where2.Field_Data.indexOf(d);
            if(card_index > -1) {
                where2.Field_Data.splice(card_index, 1);
            }
            else {
                alert('승리하셨습니다.');
                where2.cost.textContent = 10;
                where.cost.textContent = 10;
                init();
            }
        }
        where.Select_Card = null;
        where.Select_CardData = null;
        reDraw((turn ? false : true));
        return;
    }
    else if((turn ? !d.mine : d.mine)) {
        return;
    }

    if(d.field) {
        const tp = turn ? '#my-hero .card' : '#rival-hero .card';
        const tp1 = turn ? card.parentNode.previousSibling.previousSibling : card.parentNode.nextSibling.nextSibling;
        document.querySelector(tp).classList.remove('card-selected')
        card.parentNode.querySelectorAll('.card').forEach(d => {
            d.classList.remove('card-selected');
        });    
        card.classList.add('card-selected');    
        if(document.querySelector(tp).classList.contains('card-selected')) {
            tp1.querySelectorAll('.card').forEach(d => {
                    d.classList.remove('card-selected');
            });
        }
        where.Select_Card = card;  
        where.Select_CardData = d
    }
    else {
        if(!moveField(d, (turn ? true : false))) {
            turn ? myDeck(1) : rivalDeck(1);
        }
    }
}

function card_Connect(d, pos, hero) {
    const card = document.querySelector('.card-hidden .card').cloneNode(true);   // cloneNode는 html 을 복사 인자로 true 주면 안에 내용까지 복사
    card.querySelector('.card-cost').textContent = d.cost;
    card.querySelector('.card-att').textContent = d.att;
    card.querySelector('.card-hp').textContent = d.hp;

    if(hero) {
        card.querySelector('.card-cost').style.display = 'none';
        const name = document.createElement('div');
        name.textContent = '영웅';
        card.appendChild(name);
    }

    card.addEventListener('click', () => {
        turnAction(d, card, turn);
    })
    pos.appendChild(card);
}

function rivalDeck(num) {
    for(let i = 0; i < num; i++) {
        rival.Deck_Data.push(factory());
    }
    deckReDraw(rival);
}

function myDeck(num) {
    for(let i = 0; i < num; i++) {
        my.Deck_Data.push(factory(false, true));
    }
    deckReDraw(my);
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
    [rival, my].forEach(d => {
        d.Deck_Data = [];
        d.Field_Data = [];
        d.Hero_Data = null;
        d.Select_Card = null;
        d.Select_CardData = null;
    })
    rivalDeck(5);
    myDeck(5);
    rivalHero();
    myHero();
    reDraw(true);
    reDraw(false);
}

turn_btn.addEventListener('click', () => { 
    const sel = turn ? my : rival;
    filedReDraw(sel);
    heroReDraw(sel)
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