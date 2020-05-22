"use strict"

const tools = require('./tools');

var blocklist = [];

class pokerBlock {

  //构造方法
  constructor(blockInfo, preHash) {
    this.info = blockInfo;  //账单信息
    this.preHash = preHash;  //上一块的hash
    this.time = Date.now();  //当前几张时间
    this.nonce = 0;          //工作量
    this.createHash();  //生成当前hash

  };

  //根据当前区块的信息内容计算新的哈希值
  createHash() {

    let data = JSON.stringify(this.info) +
      this.preHash +
      this.time +
      this.nonce;

    this.hash = tools.createHash(data);
    return this.hash;
  }

  //获取当前block的hash
  getHash() { return this.hash; }

  //获取当前block的上一个block的hash
  getPreHash() { return this.preHash; }


  /**  
   * “挖矿”过程
   * 在这里指需要经过多少次哈希运算才能得到满足条件的哈希值
   * 条件有参数 difficulty 设定
   * 例如：如果difficulty 值是2,则要求计算出来的哈希值前2位字节为“00”
   * 如果计算出来不是，则nonce 值加1，继续计算
   * 直到算出来的哈希值满足条件，则结束 
   */
  mineBlock(difficulty) {
    let dstr = tools.getdifficultyStr(difficulty);

    while (this.hash.substring(0, difficulty) != dstr) {
      this.nonce++;
      this.createHash();
      //console.log('mineBlock str:', dstr, 'nonce:', this.nonce, 'hash:', this.hash);
      console.log('挖矿,次数:', this.nonce, 'hash:', this.hash);
    }
    console.log('挖矿成功!!! 总次数:', this.nonce);

  }

  /**
   * 打印模块，为了便于观看
   */
  print() {
    console.log('-------------------------------------------------------------------------------------------');
    let data = {};
    data.info = this.info;
    //时间格式化
    let date = new Date(this.time);
    let dt = date.getFullYear() + "-" + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());

    data.time = dt;
    data.preHash = this.preHash;
    data.nonce = this.nonce;
    data.hash = this.hash;
    console.log(data);

  }

};

/**
 * 添加区块
 */
exports.addBlock = function (blockInfo) {

  console.log('添加新的区块:', blockInfo);

  //获取上一个区块的hash
  let preHash;
  if (blocklist.length == 0) {
    preHash = 0;
  } else {
    preHash = blocklist[blocklist.length - 1].getHash();
  }

  //生成一个区块
  var block = new pokerBlock(blockInfo, preHash);

  //挖矿，
  let difficulty = 1;
  block.mineBlock(difficulty);

  //添加新区块
  blocklist.push(block);

  //console.log('addBlock success!!!');
  console.log('添加新区块完成!!!');
  printBlockList();
}

var printBlockList = function () {
  blocklist.forEach(v => v.print());

}
