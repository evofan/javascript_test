console.log("【Array.fill() test】");

// Array.prototype.fill()を使ったコード
const leng2: number = 10;
const elem2: string = "Cat";
const array2: Array<string | number> = [0, 1, 2, 3];
array2.fill(elem2);

console.log("array2: ", array2); // ["Cat", "Cat", "Cat", "Cat"]

// fill()を使わないでforを使った場合
const array3: string[] = new Array<string>(leng2);
const elem3: string = "Cat";
let length3 = array3.length;
for (let i = 0; i < length3; i++) {
  array3[i] = elem3;
}
console.log(array3); //  ["Cat", "Cat", "Cat", "Cat", "Cat", "Cat", "Cat", "Cat", "Cat", "Cat"]

// map()を使った方法
const array4: any[] = new Array<string | number>(leng2)
  .fill(null)
  .map(idx => elem3);
console.log(array4); // ["Cat", "Cat", "Cat", "Cat", "Cat", "Cat", "Cat", "Cat", "Cat", "Cat"]

// map()を使った方法、番号付き配列に
const array5: any[] = new Array<string | number>(leng2)
  .fill(null)
  .map((key, idx) => [idx, elem3]);
console.log(array5); // [0, "Cat"], [1, "Cat"], [2, "Cat"], [3, "Cat"], [4, "Cat"], [5, "Cat"], [6, "Cat"], [7, "Cat"], [8, "Cat"], [9, "Cat"]

// 配列 → インデックス番号付きオブジェクトへ
const Object6: object = {};
Object.keys(array4).forEach(key => (Object6[key] = array4[key]));
console.log(Object6); // {0: "Cat", 1: "Cat", 2: "Cat", 3: "Cat", 4: "Cat", 5: "Cat", 6: "Cat", 7: "Cat", 8: "Cat", 9: "Cat"}

// from()を使う
let cats_ary = ["Mike", "Kuro", "Shiro"];
let Object7: object = {};
Object7 = Array.from(cats_ary, x => (Object7[x] = `${x.toLowerCase()}猫`));
console.log("Object8: ", Object7); // ["mike猫", "kuro猫", "shiro猫"]

// 配列からインデックス番号付きオブジェクトへ（reduce使用版）
let initialValue: any = {};
let Object8: any = array4.reduce((accumulator, currentValue, idx) => {
  // console.log(accumulator);
  // console.log(currentValue);
  // console.log(idx);
  return { ...array4, [idx]: currentValue };
}, initialValue);
console.log(Object8); // {0: "Cat", 1: "Cat", 2: "Cat", 3: "Cat", 4: "Cat", 5: "Cat", 6: "Cat", 7: "Cat", 8: "Cat", 9: "Cat"}
console.log("");
