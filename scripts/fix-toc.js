const { slugify } = require('transliteration');

hexo.extend.filter.register('after_render:html', function(str) {
  const tocLinkRegex = /<a\s+class="toc-link"(?:\s+href="[^"]*")?>\s*<span class="toc-number">.*?<\/span>\s*<span class="toc-text">(.*?)<\/span>/g;
  
  return str.replace(tocLinkRegex, (match, titleText) => {
    if (!titleText) return match;

    // 智能分割中英文部分（保留连续英文单词）
    const segments = titleText.trim().split(/([a-zA-Z]+)|([^a-zA-Z]+)/g).filter(Boolean);
    
    // 处理每个部分：英文转小写，中文转拼音小写
    const slugParts = segments.map(segment => {
      if (/^[a-zA-Z]+$/.test(segment)) {
        return segment.toLowerCase(); // 强制英文小写
      } else {
        return slugify(segment, { 
          lowercase: true,  // 中文强制小写
          separator: '-',
          ignore: /[^\u4e00-\u9fa5]/g // 仅处理中文部分
        });
      }
    });
    
    // 拼接并清理多余连字符
    const slug = slugParts.join('-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const numberMatch = match.match(/<span class="toc-number">(.*?)<\/span>/);
    const number = numberMatch ? numberMatch[1] : '';

    return `<a class="toc-link" href="#${slug}"><span class="toc-number">${number}</span><span class="toc-text">${titleText}</span></a>`;
  });
});