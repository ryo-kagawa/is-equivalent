import isEquivalent from "../../src/isEquivalent.js";

let count = 0;
let errorList = [];

function test(value1, value2, compare, option, flag) {
  if(flag !== isEquivalent(value1, value2, compare, option)) {
    errorList.push({testNo: count, value1, value2, compare, option});
  }
  count++;
}

test({}, {}, undefined, undefined, true);
test({test: 1}, {test: 1}, undefined, undefined, true);
test({a: 1, test: 1}, {b: 1, test: 1}, undefined, undefined, false);
test({a: 1, test: 1}, {b: 1, test: 1}, {test: true}, undefined, true);
test({a: 1, test: {test_1: 1, test_2: 1}}, {b: 1, test: {test_1: 1, test_2: 2}}, {test: {test_1: true}}, undefined, true);
test({test_1: {test_1_1: 1, test_1_2: 2}, test_2: {test_2: 1}}, {test_1: {test_1_1: 1, test_1_2: 2}, test_2: {test_2: 2}}, {test_1: true}, undefined, true);
test({test: 1}, {test: "1"}, {test: true}, undefined, false);
test([{a: 1, test: 2}], [{b: 1, test: 2}], {test: true}, undefined, true);
test({test: 1}, {test: "1"}, {test: function(a, b) {return a == b}}, undefined, true);
test({test: function() {return 1;}}, {test: function() {return 2;}}, undefined, {isEquivalent: true}, false);
test({}, {test: 1}, undefined, undefined, false);
test({}, {test: 1}, undefined, {isJudgmentNoneParameter: true}, false);

// v1.x系で発生していたオブジェクト比較の場合に1つ目の判定だけで結果を返していた不具合確認用
test({a: 0, b: 1}, {a: 0, b: 1}, {a: true, b: true}, undefined, true);
test({a: 0, b: 1}, {a: 1, b: 1}, {a: true, b: true}, undefined, false);

if(errorList.length === 0) {
  console.log("test count", count, "all test success");
} else {
  console.error("test count", count, "error", errorList);
}
