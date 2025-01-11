// // scripts/modify-font-size.js

// const fs = require('fs');
// const path = require('path');

// // 修改路径为 public 目录下的 CSS 文件
// const filePath = path.join(__dirname, '..', 'public', 'css', 'index.css'); // 修正路径

// // 定义要替换的内容
// const oldFontSize = '--global-font-size: 14px';
// const newFontSize = '--global-font-size: 16px';

// // 读取文件并修改内容
// fs.readFile(filePath, 'utf8', (err, data) => {
//   if (err) {
//     console.error('读取文件失败:', err);
//     return;
//   }

//   // 替换字体大小
//   const updatedData = data.replace(oldFontSize, newFontSize);

//   // 写回修改后的内容
//   fs.writeFile(filePath, updatedData, 'utf8', (err) => {
//     if (err) {
//       console.error('写入文件失败:', err);
//     } else {
//       console.log('字体大小已更新为 16px');
//     }
//   });
// });
