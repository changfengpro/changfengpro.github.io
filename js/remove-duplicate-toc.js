document.addEventListener('DOMContentLoaded', function() {
  // 获取所有的目录项
  const tocItems = document.querySelectorAll('.toc > ul > li');

  // 用来存储已经处理过的标题
  let seen = new Set();

  tocItems.forEach(item => {
      const link = item.querySelector('a');  // 获取每个目录项中的链接
      if (link) {
          const text = link.textContent.trim();  // 获取链接的文本内容

          // 检查该标题是否已经处理过
          if (seen.has(text)) {
              // 如果已处理过，则删除当前目录项
              item.remove();
          } else {
              // 否则将标题添加到集合中
              seen.add(text);
          }
      }
  });
});
