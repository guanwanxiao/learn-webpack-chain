// require('./style/index.css')
const a:string = '这里是 index.ts'
const obj = {
  name:'dd',
  age:12
}
var h2 = document.createElement('h2');
h2.className = 'test';
h2.innerText = 'test';
document.body.append(h2);
console.log(a)
const { age } = obj
console.log('age',age)