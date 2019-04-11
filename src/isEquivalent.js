"use strict";

const _getObjectKeyList = Object.keys;
const _getObjectHasOwnProperty = Object.hasOwnProperty;
const _isArray = Array.isArray;
const _isDate = (value) => value instanceof Date;
const _isFunction = (value) => typeof value === "function";
const _isObject = (value) => Object.prototype.toString.call(value) === "[object Object]";
// Number.isNaNのポリフィルはNumber.constructorまで含まれてしまい大きなファイル出力となってしまうので代替関数を作成する
// const _isNaN = Number.isNaN;
const _isNaN = (value) => value !== value;
const _isRegExp = (value) => value instanceof RegExp;

const DEFAULT_OPTION = {
  // 関数の比較をするか
  isCompareFunction: false,
  // 存在しないパラメーターを比較しようとした場合の扱い
  isJudgmentNoneParameter: false
};

export default function isEquivalent(value1, value2, compare = undefined, option) {
  const mergeOption = Object.assign({}, DEFAULT_OPTION, option);
  return _isEquivalent_main(value1, value2, compare, mergeOption);
}

function _isEquivalent_main(value1, value2, compare, option) {
  if(_isFunction(compare)) {
    return compare(value1, value2);
  }

  if(value1 === value2) {
    return true;
  }

  // NaNどうしの比較はfalseを返すので両方共NaNの場合には例外的にtrueを返す
  if(_isNaN(value1)) {
    return _isNaN(value2);
  }

  if(_isDate(value1)) {
    return _isDate(value2) && value1.getTime() === value2.getTime();
  }

  if(_isRegExp(value1)) {
    return _isRegExp(value2) && value1.toString() === value2.toString();
  }

  if(option.isCompareFunction && _isFunction(value1)) {
    return _isFunction(value2) && String(value1) === String(value2);
  }

  if(_isArray(value1)) {
    return _isArray(value2) && _isEquivalent_Array(value1, value2, compare, option);
  }

  if(_isObject(value1)) {
    return _isObject(value2) && _isEquivalent_Object(value1, value2, compare, option);
  }

  return false;
}

function _isEquivalent_Array(value1, value2, compare, option) {
  const length = value1.length;
  if(length !== value2.length) {
    return false;
  }

  // 0比較の方が高速なので逆順で処理する
  // IEのみ前置式よりも後置式の方が高速なので後置式でデクリメントする
  for(let i=length; i-- !== 0;) {
    if(!_isEquivalent_main(value1[i], value2[i], compare, option)) {
      return false;
    }
  }
  return true;
}

function _isEquivalent_Object(value1, value2, compare, option) {
  if(compare === undefined) {
    const keys = _getObjectKeyList(value1);
    if(keys.length !== _getObjectKeyList(value2).length) {
      return false;
    }

    for(let i=keys.length; i-- !== 0;) {
      const key = keys[i];
      if(!value2.hasOwnProperty(key)) {
        return false;
      }

      if(!_isEquivalent_main(value1[key], value2[key], undefined, option)) {
        return false
      }
    }
    return true;
  }

  const keys = _getObjectKeyList(compare);
  for(let i=keys.length; i-- !== 0;) {
    const key = keys[i];

    if(!compare[key]) {
      continue;
    }

    const hasPropertyValue1 = value1.hasOwnProperty(key);
    const hasPropertyValue2 = value2.hasOwnProperty(key);

    if(!hasPropertyValue1 && !hasPropertyValue2) {
      return option.isJudgmentNoneParameter;
    }

    if(!(hasPropertyValue1 && hasPropertyValue2 && _isEquivalent_main(value1[key], value2[key], compare[key], option))) {
      return false;
    }
  }

  return true;
}
