// import  babel from '@babel/core';
const babel = require('@babel/core') 
const source = require('../babel/index.js')
function splitCode({types:t}) {
  return {
    visitor: {
      // 遍历
      VariableDeclarator(path, state) {
        if (path.node.id.name == 'a') {
          path.node.id = t.identifier('b')
        }
      }

    },
  };
}

const result = babel.transform(source,{
  plugins:[splitCode]
})

console.log('result',result.code)