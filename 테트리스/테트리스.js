const tetris = document.getElementById('tetris');
const nextTetries = document.getElementById('next-table');
let score = 0;
let tetrisData = [];
let currentTopLeft = [0, 3];
let currentBlock;
let nextBlock;
let stopBlock = false;
let blockInfo = [{
    name: 's', // 네모
    center: false,
    numCode: 1,
    color: 'red',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [0, 1, 1],
        [0, 1, 1],
      ]
    ],
  },
  {
    name: 't', // T자
    center: true,
    numCode: 2,
    color: 'orange',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ]
  },
  {
    name: 'z', // 지그재그
    center: true,
    numCode: 3,
    color: 'yellow',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ]
  },
  {
    name: 'zr', // 반대 지그재그
    center: true,
    numCode: 4,
    color: 'green',
    startRow: 1,
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ],
    ]
  },
  {
    name: 'l', // L자
    center: true,
    numCode: 5,
    color: 'blue',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ],
    ]
  },
  {
    name: 'lr', // 반대 L자
    center: true,
    numCode: 6,
    color: 'navy',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
    ]
  },
  {
    name: 'b', // 1자
    center: true,
    numCode: 7,
    color: 'violet',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
    ]
  },
];
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'violet'];

function init() {        // 처음 화면 그리기
    const fragment = document.createDocumentFragment();
    [...Array(20).keys()].forEach(d => {
        const tr = document.createElement('tr');
        fragment.appendChild(tr);
        [...Array(10).keys()].forEach(p => {
            const td = document.createElement('td');
            tr.appendChild(td);
        })
        const arr = Array(10).fill(0);
        tetrisData.push(arr);
    })
    tetris.appendChild(fragment);
}

function createBlock() {             // 블록 생성
    let gameOver = false;
    if(!currentBlock) {
        currentBlock = blockInfo[Math.floor(Math.random() * blockInfo.length)];
    }
    else {
       currentBlock = nextBlock;
    }
    currentTopLeft = [-1, 3];
    nextBlock = blockInfo[Math.floor(Math.random() * blockInfo.length)];
    nextBlockView();

    currentBlock.shape[0].slice(1).forEach((d, i) => {
        d.forEach((k, j) => {
            if(k && tetrisData[i][j+3]) {
            //    겜종료
                gameOver = true;
            }
        })
    })
    
    currentBlock.shape[0].slice(1).forEach((d, i) => {
        d.forEach((k, j) => {
            if(k) {
                tetrisData[i][j+3] = currentBlock.numCode;
            }
        })
    })
       
    if(gameOver) {
        clearInterval(ii);
        alert('게임종료');
        tetrisData = [];
        tetris.innerHTML = '';
        startNow();
    }
    else {
        drawBlock();
    }
}

function nextBlockView() {      // 다음 블록 화면에 그리기
    nextBlock.shape[0].forEach((d, i) => {
        d.forEach((p, j) => {
            if(p) {
                nextTetries.querySelectorAll('tr')[i].children[j].className = colors[nextBlock.numCode -1];
                if(j != 3) {
                    nextTetries.querySelectorAll('tr')[2].children[3].className = '';
                }
            }
            else {
                nextTetries.querySelectorAll('tr')[i].children[j].className = '';
            }
        })
    })
}

function drawBlock() {       // 블록 화면에 그리기
    tetrisData.forEach((d, i) => {
        d.forEach((p, j) => {
            if(p) {
                tetris.children[i].children[j].className = tetrisData[i][j] < 10 ? colors[tetrisData[i][j] - 1] : colors[tetrisData[i][j] / 10 - 1];
            }
            else {
                tetris.children[i].children[j].className = '';
            }
        })
    })
}

function checkBlock() {         // 칸 다 차면 블록 지우기
    const check = [];
    tetrisData.forEach((d, i) => {
        let count = 0;
        d.forEach((p, j) => {
            if(p > 0) {
                count++;
            }
        })
        if(count == 10) {
            check.push(i);
        }
    });

    tetrisData = tetrisData.filter((d, i) => !check.includes(i));

    for(let i = 0; i < check.length; i++) {
        tetrisData.unshift([0,0,0,0,0,0,0,0,0,0]);
        score++;
        console.log(score)
        document.getElementById('score').textContent = score;
    };
}

function downBlock() {        // 블록 생성해서 내리기
    let check = [currentTopLeft[0] + 1, currentTopLeft[1]];
    let downChk = true;
    let arr = [];
    let blockCount = currentBlock.shape[currentBlock.currentShapeIndex];

    for(let i = currentTopLeft[0]; i < currentTopLeft[0] + blockCount.length; i++) {
        if(i < 0 || i >= 20) continue;
        for(let j = currentTopLeft[1]; j < currentTopLeft[1] + blockCount.length; j++) {
            if(tetrisData[i][j] > 0 && tetrisData[i][j] < 10) {
                arr.push([i,j]);
                if(tetrisData[i + 1] == undefined || tetrisData[i + 1][j] >= 10) {
                    downChk = false;
                }
            }
        }
    }

    if(downChk) {
        for(let i = tetrisData.length - 1; i >= 0; i--) {
            tetrisData[i].forEach((d, j) => {
                if(d < 10 && tetrisData[i + 1] && tetrisData[i + 1][j] < 10) {
                    tetrisData[i + 1][j] = d;
                    tetrisData[i][j] =  0;
                }
            })
        }
        currentTopLeft = check;
        drawBlock();
        return true;
    }
    else if(!downChk) {
        arr.forEach(d => {
            tetrisData[d[0]][d[1]] *= 10;
        })
        checkBlock();
        createBlock();
        return false;
    }
}

function leftBlock() {       // 블록 왼쪽이동
    let check = [currentTopLeft[0], currentTopLeft[1] - 1];
    let leftChk = true;
    let blockCount = currentBlock.shape[currentBlock.currentShapeIndex];

    for(let i = currentTopLeft[0]; i < currentTopLeft[0] + blockCount.length; i++) {
        if(i < 0 || i >= 20) continue;
        for(let j = currentTopLeft[1]; j < currentTopLeft[1] + blockCount.length; j++) {
            if (!tetrisData[i] || !tetrisData[i][j]) continue;
            if(tetrisData[i][j - 1] == undefined || tetrisData[i][j - 1] >= 10) {
                leftChk = false;
            }
        }
    }

    if(leftChk) {
        tetrisData.forEach((d, i) => {
            for(let j = 0; j < d.length; j++) {
                if(tetrisData[i][j - 1] == 0 && tetrisData[i][j] < 10){
                    tetrisData[i][j - 1] = d[j];
                    tetrisData[i][j] = 0;
                }
            }
        })
        currentTopLeft = check;
        drawBlock();
    } 
}

function rightBlock() {          // 블록 오른쪽 이동
    let check = [currentTopLeft[0], currentTopLeft[1] + 1];
    let rightChk = true;
    let blockCount = currentBlock.shape[currentBlock.currentShapeIndex];

    for(let i = currentTopLeft[0]; i < currentTopLeft[0] + blockCount.length; i++) {
        if(i < 0 || i >=20) continue;
        for(let j =  currentTopLeft[1]; j < currentTopLeft[1] + blockCount.length; j++) {
            if (!tetrisData[i] || !tetrisData[i][j]) continue;
            if(tetrisData[i][j + 1] == undefined || tetrisData[i][j + 1] >= 10) {
                rightChk = false;
            }
        }
    }

    if(rightChk) {
        tetrisData.forEach((d, i) => {
            for(let j = d.length - 1; j >= 0; j--) {
                if(tetrisData[i][j + 1] == 0 && tetrisData[i][j] < 10) {
                    tetrisData[i][j + 1] = d[j];
                    tetrisData[i][j] = 0;
                }
            }
        })
        currentTopLeft = check;
        drawBlock();
    }
}

function rotateBlock() {   // 블록 회전하기
    let blockCount = currentBlock.shape[currentBlock.currentShapeIndex];
    let rotateChk = true;
    const nextBlockCount = currentBlock.currentShapeIndex + 1 == currentBlock.shape.length ? 0 : currentBlock.currentShapeIndex + 1;
    
    const nextBlockShape = currentBlock.shape[nextBlockCount];
    for(let i = currentTopLeft[0]; i < currentTopLeft[0] + blockCount.length; i++) {
        if(i < 0 || i >= 20) continue;
        for(let j = currentTopLeft[1]; j < currentTopLeft[1] + blockCount.length; j++) {
            if(nextBlockShape[i - currentTopLeft[0]][j - currentTopLeft[1]] > 0 && tetrisData[i][j] >= 10 && tetrisData[i][j] == undefined) {
                rotateChk = false;
            }
        }
    }

    if(rotateChk) {
        while (currentTopLeft[0] < 0) {
            downBlock();
        }
        for(let i = currentTopLeft[0]; i < currentTopLeft[0] + blockCount.length; i++) {
            if(i < 0 || i >= 20) continue;
            for(let j = currentTopLeft[1]; j < currentTopLeft[1] + blockCount.length; j++) {
                if(nextBlockShape[i- currentTopLeft[0]][j - currentTopLeft[1]] > 0 && tetrisData[i][j] == 0) {
                    tetrisData[i][j] = currentBlock.numCode;
                } 
                else if (nextBlockShape[i - currentTopLeft[0]][j - currentTopLeft[1]] == 0 && tetrisData[i][j] < 10) {
                    tetrisData[i][j] = 0;
                }
            }
        }
        currentBlock.currentShapeIndex = nextBlockCount;
        drawBlock();
    }
}
let ii = setInterval(downBlock, 500);

function startNow() {
    clearInterval(ii);
    ii = setInterval(downBlock, 500);
    score = 0;
    init();
    createBlock();
}

startNow();

window.addEventListener('keydown', e => {
    switch(e.code) {
        case 'ArrowLeft' : {
            leftBlock();
            break;
        }
        case 'ArrowRight' : {
            rightBlock();
            break;
        }
        case 'ArrowDown' : {
            downBlock();
            break;
        }
    }
});

window.addEventListener('keyup', e => {
    switch(e.code) {
        case 'ArrowUp' : {
            rotateBlock();
            break;
        }
        case 'Space' : {
            while(downBlock()) {};
            break;
        }
    }
});

document.getElementById('mute').addEventListener('click', function() {
    if (document.getElementById('bgm').paused) {

        document.getElementById('bgm').play();
        document.getElementById('mute').textContent = '소리끔';
    } 
    else {
        document.getElementById('bgm').pause();
        document.getElementById('mute').textContent = '소리켬';
    }
});