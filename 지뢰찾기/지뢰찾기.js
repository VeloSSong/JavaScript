const btn = document.getElementById('btn');
const tbo = document.querySelector('tbody');
const kk = document.getElementById('mine');
let dataSet = [];
let flag = false;
let open_count = 0;
let time_count = 1;
let minus_count = 1;
let sibal = 0;

btn.addEventListener('click', () => {
    tbo.innerHTML = '';   // 초기화
    dataSet = [];         // 초기화
    time_count = 1        // 초기화
    flag = false;
    const aa = Number(document.getElementById('aa').value);     // 가로
    const bb = Number(document.getElementById('bb').value);     // 세로
    const mine = Number(document.getElementById('mine').value); // 폭탄
    const timer = document.querySelector('#time span');         // 타이머
    const countMine = document.querySelector('#Cm span');       // 폭탄개수
    countMine.textContent = mine;
    const win_count = (aa * bb - mine);
    let mineData = Array(aa * bb).fill().map((n, k) => {
        return k;
    });
    let shaple = [];
    let vvv = mineData.length - mine;
    
    while(mineData.length > vvv) {
        let dec = mineData.splice(Math.floor(Math.random() * mineData.length), 1)[0];
        shaple.push(dec);
    }
    
    for(let i = 0; i < bb; i++) {
        let tr = document.createElement('tr');
        let arr = [];
        dataSet.push(arr);
        tbo.appendChild(tr);
        for(let j = 0; j < aa; j++) {
            arr.push(0);
            let td = document.createElement('td');

            td.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                let parTr = e.currentTarget.parentNode;   // 클릭한 td의 tr을 찾음
                let parTbo = parTr.parentNode;            // tr을 감싸는 테이블을 찾음
                const aa = Array.prototype.indexOf.call(parTr.children, td);        // indexOf는 배열에서 사용가능 하지만 Array.prototype.indexOf.call을 이용하여 사용가능하게 만듬
                const bb = Array.prototype.indexOf.call(parTbo.children, parTr);    // indexOf는 배열에서 사용가능 하지만 Array.prototype.indexOf.call을 이용하여 사용가능하게 만듬
                
                if(flag) {
                    return;
                }
                if(dataSet[bb][aa] == 1) {
                    return;
                }

                if(['X', ''].includes(tbo.children[bb].children[aa].textContent)) {
                    tbo.children[bb].children[aa].textContent = '!'; 
                    const BS = document.querySelector('#Cm span').textContent;
                    countMine.textContent = BS - minus_count;
                    tbo.children[bb].children[aa].style.color = "#fff";
                }
                else if(['!'].includes(tbo.children[bb].children[aa].textContent)) {
                    tbo.children[bb].children[aa].textContent = '?';
                }
                else if(['?'].includes(tbo.children[bb].children[aa].textContent)) {
                    const BS = document.querySelector('#Cm span').textContent;
                    if(['X'].includes(dataSet[bb][aa])) {
                        tbo.children[bb].children[aa].textContent = 'X';
                        countMine.textContent = Number(BS) + 1;
                        tbo.children[bb].children[aa].style.color = "#444";
                    }
                    else if ([0].includes(dataSet[bb][aa])) {
                        tbo.children[bb].children[aa].textContent = '';
                        countMine.textContent = Number(BS) + 1;
                    }
                }             
            })
            
            td.addEventListener('click', (e) => {                       
                let parTr = e.currentTarget.parentNode;
                let parTbo = parTr.parentNode;
                const aa = Array.prototype.indexOf.call(parTr.children, td);
                const bb = Array.prototype.indexOf.call(parTbo.children, parTr);

                if(flag) {
                    return;
                }
                if(e.currentTarget.textContent==='!'){
                    return;
                }
                if(e.currentTarget.textContent==='?'){
                    return;
                }

                td.classList.add('action');                      
                if(dataSet[bb][aa] != 1) {
                    open_count++;
                }
                                    
                if(tbo.children[bb].children[aa].textContent == 'X') {
                    alert('펑!! 게임종료');  
                    clearInterval(tti);                     
                    flag = true;                       
                }
                else {
                    let rangeM = [ 
                        dataSet[bb][aa-1], dataSet[bb][aa+1],
                    ];
                                    
                    if(dataSet[bb-1]) {                          
                        rangeM = rangeM.concat(dataSet[bb-1][aa-1], dataSet[bb-1][aa], dataSet[bb-1][aa+1]);
                    }
                    if(dataSet[bb+1]) {
                        rangeM = rangeM.concat(dataSet[bb+1][aa-1], dataSet[bb+1][aa], dataSet[bb+1][aa+1]);
                    }

                    let mine_count = rangeM.filter(d => {
                        return d == 'X';
                    }).length;                        

                    if(mine_count == 0) {
                        mine_count = '';
                    }
                    tbo.children[bb].children[aa].textContent = mine_count;
                    dataSet[bb][aa] = 1;
                
                    if(open_count == win_count) {
                        alert('승리하셨습니다!!');
                        clearInterval(tti);          
                        flag = true;
                    }

                    if(mine_count == 0) {
                        let mineRange = [
                            tbo.children[bb].children[aa-1], tbo.children[bb].children[aa+1]
                        ];
                        if(dataSet[bb-1]) {                          
                            mineRange = mineRange.concat(tbo.children[bb-1].children[aa-1], tbo.children[bb-1].children[aa], tbo.children[bb-1].children[aa+1]);
                        }
                        if(dataSet[bb+1]) {
                            mineRange = mineRange.concat(tbo.children[bb+1].children[aa-1], tbo.children[bb+1].children[aa], tbo.children[bb+1].children[aa+1]);
                        }
                        
                        mineRange.filter(d => !!d).forEach(key => {  //  undefined인것은 제거
                            let parTr = key.parentNode;          // tr을 찾음
                            let parTbo = parTr.parentNode;       // tbody를 찾음
                            const aa = Array.prototype.indexOf.call(parTr.children, key);
                            const bb = Array.prototype.indexOf.call(parTbo.children, parTr);
                            if(dataSet[bb][aa] != 1) {
                                key.click(); 
                            }                                                      
                        });                          
                    }
                }                        
            })
            tr.appendChild(td);
        }
    }
    for(var k = 0; k < shaple.length; k++) {
        var ra = Math.floor(shaple[k] / aa);
        var lb = shaple[k] % aa;

        dataSet[ra][lb] = 'X';
        tbo.children[ra].children[lb].textContent = 'X';

        if(tbo.children[ra].children[lb].textContent = 'X') {
            tbo.children[ra].children[lb].style.color = "#444";
        }
    }

    countMine.textContent = mine;

    const tti = setInterval(() => {
        timer.textContent = time_count;
        time_count++;                          
    }, 1000)
})