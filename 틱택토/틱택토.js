let array = [];
let array2 = [];
let turn = 'X';
let chk = false;
const btn = document.querySelectorAll('td');
const res = document.querySelector('.result');

function winLateCheck(po, po2) {
    if(array[po][0].textContent == turn && array[po][1].textContent == turn && array[po][2].textContent == turn) {
        chk = true;
    }  // 가로 빙고
    else if(array[0][po2].textContent == turn && array[1][po2].textContent == turn && array[2][po2].textContent == turn) {
        chk = true;
    }  // 세로빙고
    else if(array[0][0].textContent == turn && array[1][1].textContent == turn && array[2][2].textContent == turn) {
        chk = true;
    }  // 왼쪽에서 오른쪽 대각선
    else if(array[0][2].textContent == turn && array[1][1].textContent == turn && array[2][0].textContent == turn) {
        chk = true;
    }  // 오른쪽에서 왼쪽 대각선
    
    else if(array[0][0].textContent != '' && array[0][1].textContent != '' && array[0][2].textContent != '' 
        && array[1][0].textContent != '' && array[1][1].textContent != '' && array[1][2].textContent != '' &&        // 무승부 체크
        array[2][0].textContent != '' && array[2][1].textContent != '' && array[2][2].textContent != '') {                  
            res.textContent = '무승부';
            array.forEach(po2 => {
                po2.forEach(po => {
                    po.textContent = '';
                })
            })
            chk = false;
        }
}

function WinChk(po, po2) {
    res.textContent = `게임종료 ${turn} 승리`
    turn = 'X';
    setTimeout(() => {
        turn = 'X';
        array.forEach(po2 => {
            po2.forEach(po => {
                po.textContent = '';
            })
        })
        chk = false;
        res.textContent = '';
    }, 2000);
}

for(let i = 0; i < 3; i++) {
    let tik = document.querySelectorAll('tr')[i];
    array2.push(tik);
    array.push([]);
    for(let j =  0; j < 3; j++) {
        let tik2 = tik.querySelectorAll('td')[j];
        array[i].push(tik2);
    }
}

btn.forEach(key => key.addEventListener('click', function(e) {
    const po = array2.indexOf(e.target.parentNode);
    const po2 = array[po].indexOf(e.target);

    if(turn == 'O') {
        return;
    }

    if(array[po][po2].textContent == '') {  
        array[po][po2].textContent = turn;
        
        winLateCheck(po, po2);
    
        if(chk == true) {
            WinChk(po, po2)
        }
        else if(chk == false) {                                                  
            if(turn == 'X') {
                turn = 'O';     
            }               
            setTimeout(() => {
                let ar = [];
                array.forEach(d => {
                    d.forEach(k => {
                        ar.push(k)
                    })
                })                       
                ar = ar.filter(d => { 
                    return d.textContent == '';   // filter는 true만 반환   '', undefined, null, 0, NaN 등은 if문에서 false임.
                }) 

                const nnnn = Math.floor(Math.random() * ar.length)                      
                ar[nnnn].textContent = 'O';
                
                const io = ar[nnnn].parentNode;
                const io2 = array[array2.indexOf(io)].indexOf(ar[nnnn]) 
                const iio = array2.indexOf(io);

                winLateCheck(iio, io2);
            
                if(chk == true) {                      
                    WinChk(po, po2)
                }
                turn = 'X';                                          
            }, 1000)              
        }
    }
    else if(array[po][po2].textContent != '') {
        alert('이미 놓은 자리입니다.')
    }              
}))   