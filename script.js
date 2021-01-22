const world = document.getElementById('world');
const btn = document.getElementById('btn');
const res = document.getElementById('result');
const rnd = document.getElementById('rand');
const keytocheck = document.getElementById('key');
const lookforkey = document.getElementById('check');
const oldresults = document.getElementById('oldresults');
let x = document.getElementById('x');
x.addEventListener('change',drawgrid);
btn.addEventListener('click',count);
lookforkey.addEventListener('click',iterate);
window.addEventListener('load',drawgrid);
let rows = x.value;
let cols = rows;
let iterations = 2**(rows*cols);
let magic = '';
let key = ''
world.style = 'width: ' + (rows * 20 + rows*4) + 'px';

function drawgrid(){
  rows = x.value;
  cols = x.value;
  iterations = 2**(rows*cols)
  world.style = 'width: ' + (rows * 20 + rows*4) + 'px';
  console.log('test',rows,cols)
  cleargrid();
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      let elem = document.createElement("span");
      elem.addEventListener('click',showcoords)
      elem.textContent ='N';
      world.appendChild(elem);
    }
  }
};

function cleargrid(){
  world.textContent = '';
}

function random(){
  return Math.random() < 0.5;
}

function dec2bin(dec){
  let res = (dec >>> 0).toString(2)
  while (res.length < rows*cols) {
    res = '0' + res;
  }
    return res;
};

function iterate(){
  let cells = document.querySelectorAll("span");
  let lfkey = keytocheck.value;
  let keyfound = false;
  let counter = '';
  console.log(lfkey)
  for (var i = 0; i < iterations; i++) {
    for (var j = 0; j < rows*cols; j++) {
      if (dec2bin(i)[j] == '1') {
        cells[j].style = 'background-color:green'
        cells[j].textContent = 'Y';
      } else {
        cells[j].style = 'background-color:white'
        cells[j].textContent = 'N';
      }
    }
    counter = count();
    //tooldresult(dec2bin(i)+' = '+ counter)
    if (lfkey==counter) {
      keyfound = true;
      toresult('found right key = ' + counter)
      break;
    }
    if (keyfound) {
      break;
    }
  }
};

function count(){
  res.textContent = '';
  key = '';
  magic = '';
  countH()
  countV()
  key = magic.split(' ').join('')
  tooldresult(key)
  return key
};

function toresult(str){
  let elem = document.createElement("p");
  elem.textContent = str;
  res.appendChild(elem);
}

function tooldresult(str){
  let elem = document.createTextNode(str + "\n");
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
