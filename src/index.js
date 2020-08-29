require('./style/index.css')
require('./style/app.css')
require('./style/index.less')
require('./style/index.postcss')
var h2 = document.createElement('h2');
var div = document.createElement('div')
div.className = 'wrapper'
h2.className = 'test';
h2.innerText = 'testtesttesttesttest';
div.appendChild(h2)
document.body.append(div);