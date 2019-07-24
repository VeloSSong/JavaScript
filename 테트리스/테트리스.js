const tetris = document.getElementById('tetris');
let tetrisData = [];
let currentTopLeft = [0, 3];
let currentBlock;
let nextBlock;
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
// function init() {  // 화면 생성(구버전)
//     const fragment = document.createDocumentFragment(); // 메모리개념 속도향상효과
//     for(let i = 0; i < 20; i++) {
//         const tr = document.createElement('tr');
//         let arr = [];
//         tetrisData.push(arr);
//         fragment.appendChild(tr);
//         for(let j = 0; j < 10; j++) {
//             const td = document.createElement('td');
//             arr.push(0);
//             tr.appendChild(td);
//         }
//     }
//     tetris.appendChild(fragment);   
// }

function init() {   // 화면생성(최신버전)
    const fragment = document.createDocumentFragment();
    [...Array(20).keys()].forEach(d => {
        const tr = document.createElement('tr');
        fragment.appendChild(tr);
        [...Array(10).keys()].forEach(d => {
            const td = document.createElement('td');
            tr.appendChild(td);
        })
        const column = Array(10).fill(0);
        tetrisData.push(column);
    })
    tetris.appendChild(fragment);
}

function createBlock() {    // 블록 생성
    if(!currentBlock) {
        currentBlock = blockInfo[Math.floor(Math.random() * blockInfo.length)];
    }
    else {
        currentBlock = nextBlock;
    }
    nextBlock = blockInfo[Math.floor(Math.random() * blockInfo.length)];
    currentTopLeft = [-1, 3];
    
    currentBlock.shape[0].slice(1).forEach((d, i) => {
        d.forEach((p, j) => {
            if(p) {
                tetrisData[i][j+3] = currentBlock.numCode;
            }
        })
    })
    drawBlock();
}

function drawBlock() { // 화면에 그리기
    tetrisData.forEach((d, i) => {
        d.forEach((p, j) => {
            if(p > 0) {
                tetris.children[i].children[j].className = colors[tetrisData[i][j]] >= 10 ? colors[tetrisData[i][j] / 10 -1] : colors[tetrisData[i][j] -1];
            }
            else {
                tetris.children[i].children[j].className = '';
            }
        })
    })
}

function downBlock() {    // 블록 내리기
    const nextTopLeft = [currentTopLeft[0] + 1, currentTopLeft[1]];
    let activeBlock = true;
    for(let i = tetrisData.length -1; i >= 0; i--) {
        tetrisData[i].forEach((d, j) => {
            if(d > 0 && d < 10) {
                if(tetrisData[i+1] && !stopBlock) {
                    tetrisData[i+1][j] = d;
                    tetrisData[i][j] = 0;
                }
                else {
                    tetrisData[i][j] = d * 10;
                    stopBlock = true;
                }
            }
        })
    }
    if(stopBlock) {
        createBlock();
    }
    drawBlock();
}

window.addEventListener('keydown', e => {
    switch(e.code) {
        case 'ArrowLeft' :
            break;
        case 'ArrowRight' :
            break;
        case 'ArrowDown' :
            break;
        default :
            break;
    }
});

window.addEventListener('keyup', e => {
    switch(e.code) {
        case 'space' :
            break;
        case 'ArrowUp' :
            break;
    }
})

init();
createBlock();
// setInterval(downBlock, 100);
