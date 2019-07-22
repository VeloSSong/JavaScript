const btn = document.getElementById('screen');
let next_page;
let start;
let end;
btn.addEventListener('click', () => {
    if(btn.classList.contains('wating')) {
        btn.classList.remove('wating');
        btn.classList.add('ready');
        btn.textContent = '초록색 화면이 나오면 클릭해주세요';
        next_page = setTimeout(() => {
            start = new Date();
            btn.click();
        }, Math.floor(Math.random() * 1000) + 1000)
    }
    else if(btn.classList.contains('ready')) {
        if(!start) {
            clearTimeout(next_page);
            btn.classList.remove('ready');
            btn.classList.add('wating');
            btn.textContent = '다시 시작해주세요';
        }
        else {
            btn.classList.remove('ready');
            btn.classList.add('now');
            btn.textContent = '클릭하세요';
        }
    }
    else if(btn.classList.contains('now')) {
        end = new Date();
        btn.classList.remove('now');
        btn.classList.add('wating');
        btn.textContent = '클릭해서 시작하세요';
        console.log((end- start) / 1000);
        start = null;
        end = null;
    }
})