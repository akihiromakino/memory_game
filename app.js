//乱数を作成
const rand = (min,max) => {
  return Math.floor(Math.random()*(max-min+1))+min
};


//カード番号の配列
const cards = [
  'A','2','3','4','5','6','7','8','9','10','J','Q','K',
  'A','2','3','4','5','6','7','8','9','10','J','Q','K',
];


//シャッフルのアルゴリズム
for (let i=cards.length-1; i>0; i--) {
  let randomNum = rand(0,i);
  let tmp = cards[i];
  cards[i] = cards[randomNum]
  cards[randomNum] = tmp;
};


//時間経過測定の定義
let count = 0;
let align = 0;
let clock = document.getElementById('clock');
let isTime = setInterval(function() {
  clock.innerHTML = '経過時間：' + (++count)
} ,1000)


//2枚のカードが同じか判定する関数
const judge = () => {
  if (first.innerHTML == second.innerHTML) {
    first.style.visibility = 'hidden';
    second.style.visibility = 'hidden';
    align += 2;
    if (align == cards.length) {
      clearInterval(isTime);
      displayFinish();
    }
  } else {
    first.innerText = '';
    second.innerText = '';
  }
  first = null;
  second = null;
  timer = null;
};


//カードをクリックしたときの処理
let first = null;
let second = null;
let timer = null;
const click = (e) => {
  if (timer) {
    clearTimeout(timer);
    judge();
  }
  let div = e.target;
  div.innerHTML = cards[div.index];

  if (!first) {
    first = div;
  } else if (first.index == div.index) {
    return;
  } else {
    second = div;
    timer = setTimeout(judge, 300);
  }
};


//カードを表示
const displayEnd = document.getElementById('end');
let field = document.getElementById('field');
for (let i=0; i<cards.length; i++) {
  let div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = '';
  field.appendChild(div);
  div.index = i;
  div.onclick = click;
  displayEnd.style.display = 'none';
};

//おめでとう表示の定義
const endFile = [
  '<ランク>この世界でやっていった方がいいよ',
  '<ランク>サイヤ人やん',
  '<ランク>ちょいやるやん',
  '<ランク>凡人',
  '<ランク>うんち',
  '<ランク>ごみ',
  '<ランク>義務教育受けてる？？'
];
const displayFinish = () => {
  displayEnd.style.display = '';
  if (count <= 25 ) {
    displayEnd.innerHTML = endFile[0];
  } else if (count <= 30 ) {
    displayEnd.innerHTML = endFile[1];
  } else if (count <= 35 ) {
    displayEnd.innerHTML = endFile[2];
  } else if (count <= 45 ) {
    displayEnd.innerHTML = endFile[3];
  } else if (count <= 55 ) {
    displayEnd.innerHTML = endFile[4];
  } else if (count <= 60 ) {
    displayEnd.innerHTML = endFile[5];
  } else if (61 < count) {
    displayEnd.innerHTML = endFile[6];
  }
};