console.log("import.js");

// export { func as fn } from "./export";
// 重新导出的内容在当前文件内无法使用

// import { func } from "./export";
// export { func as fn };

// func();

// 重新导出默认导出
// 1. 无法编译，语法错误： Declaration or statement expected.
// export User from "./export";

// 2. 导入时被忽略 default： export 'default' (imported as 'User') was not found in './js/import' (possible exports: COUNT, func)
// export * from "./export.js";

// 3. 正确用法
export * from "./module-export";
export { default } from "./module-export";
