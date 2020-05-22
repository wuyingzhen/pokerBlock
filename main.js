"use strict"

//简单的区块链示例:扑克牌斗地主记账

var pokerBlock = require('./pokerBlock');


console.log('hello,world!');
console.log('-------------------------------------------------------------------------------------------');

//初始化第一块
var data = {
  uanme: "创世块",
  xiaowu: 1,
  xiaoliu: 1,
  xiaozhang: -2,
  no: 1
};
pokerBlock.addBlock(data);

//添加第一块
var data1 = {
  uanme: "第一块",
  xiaowu: 1,
  xiaoliu: 1,
  xiaozhang: -2,
  no: 1
};
pokerBlock.addBlock(data1);

//添加第二块
var data2 = {
  uanme: "第二块",
  xiaowu: 4,
  xiaoliu: -2,
  xiaozhang: -2,
  no: 1
};
pokerBlock.addBlock(data2);


console.log('-------------------------------------------------------------------------------------------');
console.log('happy ending!');