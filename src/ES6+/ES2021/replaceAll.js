//学习文章:https://backbencher.dev/articles/javascript-es2021-new-features
// 普通的string 模式
const str = "Backbencher sits at the Back";
const newStr = str.replace("Back", "Front");
console.log(newStr); // "Frontbencher sits at the Back"

//使用正则表达式 模式
const str1 = "Backbencher sits at the Back";
const newStr1 = str1.replace(/Back/g, "Front");
console.log(newStr1); // "Frontbencher sits at the Front"

//使用replaceAll模式
const str2 = "Backbencher sits at the Back";
const newStr2 = str2.replaceAll("Back", "Front");
console.log(newStr2); // "Frontbencher sits at the Front"