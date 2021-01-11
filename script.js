const world = document.getElementById('world');
const btn = document.getElementById('btn');
const res = document.getElementById('result');
const rnd = document.getElementById('rand');
const keytocheck = document.getElementById('key');
const lookforkey = document.getElementById('check');
const oldresults = document.getElementById('oldresults');
btn.addEventListener('click',count);
rnd.addEventListener('click',randomise);
lookforkey.addEventListener('click',findkey);
const rows = 4;
const cols = 4;
const iterations = 10000;
let magic = '';
let key = ''

world.style = 'width: ' + (rows * 20 + rows*4) + 'px';

for (var i = 0; i < rows; i++) {
  for (var j = 0; j < cols; j++) {
    let elem = document.createElement("span");
    elem.addEventListener('click',showcoords)
    elem.textContent ='N';
    world.appendChild(elem);
  }
};

//key 14112551221111

function findkey(){
  let lfkey = keytocheck.value;
  let result = ''
  for (var i = 0; i < iterations; i++) {
    randomise()
    result = i + ':' + key + ' = ' + lfkey;
    if (key == lfkey) {
      result = result + ' FOUND!'
      toresult(result);
      break;
    }
    tooldresult(result)
    }
  }

function random(){
  return Math.random() < 0.5;
}

function randomise(){
  let cells = document.querySelectorAll("span");
for (var cell of cells) {
  cell.style = 'background-color:white'
  cell.textContent = 'N';
}
  for (var cell of cells) {
    if (random()) {
      cell.style = 'background-color:green'
      cell.textContent = 'Y';
    }
  }
  count()
};

function count(){
  res.textContent = '';
  key = '';
  magic = '';
  countH()
  countV()
  key = magic.split(' ').join('')
  tooldresult(key)
};

function toresult(str){
  let elem = document.createElement("p");
  elem.textContent = str;
  res.appendChild(elem);
}

function tooldresult(str){
  let elem = document.createTextNode( "\n" + str);
  oldresults.appendChild(elem);
}

function ch(x){ //PIONOWE
for (var line of x) {
  let count = 0;
  let output = ' ';
    for (var i = 0; i < line.length; i++) {
      if (line[i] == 'Y') {
        count++;
      }
      if (line[i] == 'N') {
        output = output + count;
        count = 0;
      }
  }
  output = output + count;
  output = output.split('0').join('')
  magic = magic + output
}
}

function cv(x) { //POZIOME
  let count = 0;
  let output = ' ';
    for (var i = 0; i < x.length; i++) {
      if (x[i] == 'Y') {
        count++;
      }
      if (x[i] == 'N') {
        output = output + count;
        count = 0;
      }
  }
  output = output + count;
  output = output.split('0').join('')
  magic = magic + output
};

function countH(){ //POZIOME
  let cells = document.querySelectorAll("span");
  let row = ''
  for (var i = 0; i < cells.length; i++) {
        row = row + cells[i].textContent;
    if (row.length == rows) {
      cv(row);
      row='';
    }
  }
};

function countV(){ //PIONOWE
  let cells = document.querySelectorAll("span");
  let col = '';
  let columns = []
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      col=col+cells[i+j*rows].textContent;
    }
    columns.push(col)
    col=''
  }
  ch(columns);
  }

function showcoords(x){
  x.target.style = 'background-color:green'
  x.target.textContent = 'Y';
}
