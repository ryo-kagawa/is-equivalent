# is-equivalent

> オブジェクト同士の比較を行うライブラリです

このREADMEはv2.0.xの内容です

# v1.x系には致命的なバグが存在しており正常に判定できていませんでしたので使用しないでください

JavaScriptでは通常オブジェクト同士の比較では同一オブジェクトでない限りfalseとなってしまいます  
本当に欲しいのは同じ内容であった場合にtrueが返って欲しいです  
これを解消するためのライブラリです

引数は4つです
* 第一引数：比較するオブジェクトその1  
* 第二引数：比較するオブジェクトその2  
* 第三引数：比較するパラメーターを指定するオブジェクト（指定しなくてもかまいません）  
* 第四引数：オプション（指定しなくてもかまいません）

対応ブラウザ
* Google Chrome：73以降  
* Internet Explorer：11  
* Microsoft Edge：18以降  
* Mozilla Firefox：66以降  
* Opera：58以降  

一応の対応ブラウザ
* Safari：12以降（設定上は含めているが、テスト端末を所有していない為）

対応終了予定
* Internet Explorer：11（2023年1月11日にWindows 8.1でのサポートが終了する為、Windows 10ではEdgeがデフォルトの為終了しても問題ない認識）


# 第一引数と第二引数について
第一引数と第二引数には比較したい値を入れます

通常の比較
```
var a_1 = {};
var b_1 = {};
console.log(a_1 === b_1); // false
var a_2 = {test: 1};
var b_2 = {test: 1};
console.log(a_2 === b_2); // false
```

isEquivalentを使った比較
```
var a_1 = {};
var b_1 = {};
console.log(isEquivalent(a_1, b_1)); // true
var a_2 = {test: 1};
var b_2 = {test: 1};
console.log(isEquivalent(a_2, b_2)); // true
```

# 第三引数について
第三引数では比較するパラメーターを指定します
これはどういうことかというと比較したいパラメーターを個別に指定できます
```
var a = {a: 1, test: 1};
var b = {b: 1, test: 1};
var compare = {test: true};
console.log(isEquivalent(a, b)); // false
console.log(isEquivalent(a, b, compare)); // true
```

もちろん深い階層の比較もできます
```
var a = {a: 1, test: {test_1: 1, test_2: 1}};
var b = {b: 1, test: {test_1: 1, test_2: 2}};
var compare = {test: {test_1: true}};
console.log(isEquivalent(a, b, compare)); // true
```

深い階層のオブジェクトの持つパラメーターを全て比較したい場合には記述を省略することもできます
```
var a = {
  test_1: {
    test_1_1: 1,
    test_1_2: 2
  },
  test_2: {
    test_2: 1
  }
};
var b = {
  test_1: {
    test_1_1: 1,
    test_1_2: 2
  },
  test_2: {
    test_2: 2
  }
};
var compare = {
  test_1: true
};
console.log(isEquivalent(a, b, compare)); // true
```

コレクションの比較にも対応しています
```
var a = [{a: 1, test: 2}];
var b = [{b: 1, test: 2}];
var compare = {test: true};
console.log(isEquivalent(a, b, compare)); // true
```

また、特殊な処理を行いたい場合には関数を指定することもできます
```
var a = {test: 1};
var b = {test: "1"};
var compare = {test: function(a, b) {return a == b}};
console.log(isEquivalent(a, b)); // false
console.log(isEquivalent(a, b, compare)); // true
```

# 第四引数について
第四引数で指定するのはオプションです  
isCompareFunctionは関数の比較をするか指定するオプションです  
デフォルトはfalseが指定されています
```
var a = {test: function() {return 1;}};
var b = {test: function() {return 2;}};
var option = {isEquivalent: true};
console.log(isEquivalent(a, b)); // true
console.log(isEquivalent(a, b, undefined, option)); // false
```

isJudgmentNoneParameterは存在しないパラメーターを比較する場合に何を返すべきか指定します  
デフォルトはfalseが指定されています
```
var a = {};
var b = {test:1};
var option = {isJudgmentNoneParameter: true};
console.log(isEquivalent(a, b)); // false
console.log(isEquivalent(a, b, undefined, option)); // true
```
