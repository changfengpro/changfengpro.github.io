'use strict'

function parseArgs(args) {
    let result = {
        author: '',
        source: '',
        smoke: false
    };

    for (let i in args) {
        let arg = args[i];
        let pair = arg.split(':');
        if (pair.length >= 2) {
            if (pair[0] == 'author') { result.author = pair[1]; }
            else if (pair[0] == 'source') { result.source = pair[1]; }
            else if (pair[0] == 'smoke') { result.smoke = pair[1] == 'true' ? true : false; }
        }
    }

    return result;
}

function poemTag(args, content) {
    args = parseArgs(args);

    let result = '<blockquote id="poem-container" class="poem-container">';

    // 正则表达式：匹配文本和HTML标签
    const tagRegex = /(<[^>]+>|\S+|\s+)/g;  // 这里使用了 \S+ 来匹配连续的非空白字符，\s+ 匹配空格
    let match;
    let lastIndex = 0;

    while ((match = tagRegex.exec(content)) !== null) {
        const text = match[0];
        
        // 如果匹配到 HTML 标签，则直接插入
        if (text.startsWith('<') && text.endsWith('>')) {
            result += text;
        } else {
            // 否则处理为逐字符的 <span> 标签包裹
            for (let i = 0; i < text.length; i++) {
                let char = text[i];

                // 为每个字符创建一个 <span>，并添加 mouseover 事件监听器
                result += `<span class="poem-char" onmouseover="this.classList.add('active')">${char}</span>`;
            }
        }
        lastIndex = tagRegex.lastIndex;
    }

    result += '</blockquote>';

    // 如果有作者和出处，添加到尾部
    if (args.author != '') {
        result += `<footer style="text-align: right"><strong>${args.author}</strong>`;
        if (args.source != '') {
            result += `<cite>《${args.source}》</cite>`;
        }
        result += "</footer>";
    }

    // 如果启用了烟雾效果，添加相关脚本
    if (args.smoke) result += '<script src="/js/smoke.js"></script>';

    return result;
}

hexo.extend.tag.register('poem', poemTag, { ends: true });