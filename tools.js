"use strict"

/**
 * 工具类
 */

const crypto = require("crypto");


exports.getdifficultyStr = function (difficulty) {
  let str = '';
  for (let i = 0; i < difficulty; i++) {
    str = str + '0';
  }
  //console.log('get difficulty str:', str);
  return str;
};


exports.createHash = function (data, mode) {
  mode = mode || 'sha256';
  let s = crypto.createHash(mode);

  //console.log('createHash:', data);
  let hash = s.update(data).digest('hex');
  //console.log('createHash:', hash);

  return hash;
}

