let list = Array(45).fill().map((n, k) => {
    return k + 1;
})
let arr = []
while(list.length > 0) {
    let list2 = list.splice(Math.floor(Math.random() * list.length), 1)[0];
    arr.push(list2);
}

const number = arr.slice(0, 6).sort((p, q) => { return p - q}); 
const bonus = arr[arr.length-1];
const result = document.getElementById('result');
const bo = document.getElementById('bonus');
let j = 1;
const siba = document.querySelector('h4');
for(let i = 0; i < number.length; i++) {
    setTimeout(() => {
        let di = document.createElement('p');
        di.textContent = number[i];
        result.appendChild(di);
    }, j * 2000);
    j++;
}
setTimeout(() => {
    siba.textContent = "마지막 보너스 번호 발표하겠습니다."
    bo.textContent = bonus;
}, j * 2000);
