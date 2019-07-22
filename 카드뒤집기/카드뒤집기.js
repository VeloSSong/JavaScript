const wrapper = document.querySelector('#wrap');
const widthVal = 4;
const heightVal = 3;
let colorList = ['red', 'red', 'hotpink', 'hotpink', 'blue', 'blue', 'yellow', 'yellow', 'lime', 'lime', 'purple', 'purple'];
let color = [];
let cardChk = [];
let cardChkSuc = [];
let click_flag = false;
let startTime;

function shaaple() {
    for(let i = 0; 0 < colorList.length; i++) {
        color = color.concat(colorList.splice(Math.floor(Math.random() * colorList.length), 1));
    }
}
    
function cardSetting(widthVal, heightVal) {
    for(let i = 0; i < widthVal * heightVal; i++) {
        const card = document.createElement('div');
        const card_inner = document.createElement('div');
        const card_front = document.createElement('div');
        const card_back = document.createElement('div');

        card.className = 'card';
        card_inner.className = 'card-inner';
        card_front.className = 'card-front';
        card_back.className = 'card-back';

        card_inner.appendChild(card_front);
        card_inner.appendChild(card_back);
        card_back.style.background = color[i];
        card.appendChild(card_inner);
        card.addEventListener('click', () => {                  
            if(click_flag && !cardChkSuc.includes(card)) {
                card.classList.toggle('flipped');
                cardChk.push(card); 
                if(cardChk[0] == cardChk[1]) {
                    cardChk = [];                           
                }                  
                if(cardChk.length == 2) {
                    click_flag = false;
                    if(cardChk[0].querySelector('.card-back').style.background == cardChk[1].querySelector('.card-back').style.background) {
                        cardChkSuc.push(cardChk[0]);
                        cardChkSuc.push(cardChk[1]);                              
                        cardChk = [];
                        click_flag = true;
                        if(cardChkSuc.length == 12) {
                            let endTime = new Date();
                            alert(`${(endTime-startTime) / 1000}초 만에 성공하셨습니다.`)
                            wrapper.innerHTML = '';
                            color = [];
                            cardChkSuc = [];
                            colorList = ['red', 'red', 'hotpink', 'hotpink', 'blue', 'blue', 'yellow', 'yellow', 'lime', 'lime', 'purple', 'purple'];                   
                            shaaple();
                            cardSetting(widthVal, heightVal);
                        }
                    }
                    else {
                        setTimeout(() => {
                            cardChk[0].classList.remove('flipped');
                            cardChk[1].classList.remove('flipped');
                            cardChk = [];
                            click_flag = true;
                        }, 1000)
                    }
                }
            }                   
        })
        wrapper.appendChild(card);
    }
    document.querySelectorAll('.card').forEach((d, i) => {
        setTimeout(() => {
            d.classList.add('flipped');
        }, 100 * i) 
    })
    document.querySelectorAll('.card').forEach((d,i) => {
        setTimeout(() => {
            d.classList.remove('flipped');
            click_flag = true;
            startTime = new Date();
        }, 5000)
    })
}
shaaple();
cardSetting(widthVal, heightVal);