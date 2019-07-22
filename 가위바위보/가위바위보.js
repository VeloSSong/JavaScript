const image = document.getElementById('choice');
const btn = document.querySelectorAll('button');
const res = document.getElementById('result');
let left = 0;
const arr = {
    주먹 : '0',
    가위 : '-248px',
    보 : '-520px',
}
let chch;

function gogo() {
    clearInterval(chch);
    chch = setInterval(() => {
        if(left == 0) {
            left = '-248px';
        }
        else if(left ==  '-248px') {
            left = '-520px';
        }
        else {
            left = 0;
        }
        image.style.background = `url('../img/good.jpeg') ${left} 0`;

    }, 100)
}

gogo();

btn.forEach(key => {
    key.addEventListener('click', (e) => {
        let sel = e.currentTarget.textContent
        clearInterval(chch);
        setTimeout(() => {
            gogo()
            res.textContent = "";
        }, 3000)
        
        const arr2 = Object.entries(arr).find(d => {
            return d[1] == left; 
        });
        
        if(arr[sel] == arr2[1]) {
            res.textContent = '비겼습니다. 3초후 재시작 됩니다.';
        }
        else if ((arr[sel] == 0 && arr2[0] == '가위') || (arr[sel] == '-248px' && arr2[0] == '보') || (arr[sel] == '-520px' && arr2[0] == '주먹')) {
            res.textContent = '이겼습니다. 3초후 재시작 됩니다.';
        }
        else if((arr[sel] == 0 && arr2[0] == '보') || (arr[sel] == '-248px' && arr[2] == '주먹') || (arr[sel] == '-520px' && arr2[0] == '가위')) {
            res.textContent = '졌습니다. 3초후 재시작 됩니다.';
        }
    })
})