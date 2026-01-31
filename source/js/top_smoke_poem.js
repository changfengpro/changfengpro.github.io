/* source/js/top_smoke_poem.js */
function initTopPoem() {
    // 1. 精确寻找文章页顶部的描述区域，如果没有则不执行，防止误伤正文 blockquote
    // Butterfly 文章页标题下方通常有 post-info，我们可以将诗词注入到一个特定的容器中
    let container = document.querySelector('#post-info .poem-custom-container');
    
    // 如果没找到容器，就动态创建一个，挂在标题下面
    if (!container) {
        const postInfo = document.querySelector('#post-info');
        if (postInfo) {
            container = document.createElement('div');
            container.className = 'poem-custom-container';
            postInfo.appendChild(container);
        }
    }

    if (container && typeof jinrishici !== 'undefined') {
        jinrishici.load(res => {
            const contentStr = res.data.content;
            const authorStr = `—— ${res.data.origin.author} 《${res.data.origin.title}》`;
            
            // 2. 构造 HTML 结构
            container.innerHTML = `
                <div class="smoke-wrap">
                    ${contentStr.split('').map(char => `<span>${char}</span>`).join('')}
                </div>
                <div class="smoke-author">${authorStr}</div>
            `;

            const spans = container.querySelectorAll('.smoke-wrap span');

            // 3. 自动入场动画：飞散后再聚合
            spans.forEach((span, index) => {
                setTimeout(() => {
                    span.classList.add('active');
                    // 4秒后文字聚合回来，以便后续手动交互
                    setTimeout(() => {
                        span.classList.remove('active');
                    }, 4000);
                }, index * 80);

                // 4. 鼠标悬停交互：再次触发烟雾
                span.onmouseenter = () => {
                    if (!span.classList.contains('active')) {
                        span.classList.add('active');
                    }
                };
                
                // 动画结束后移除类名，保证可以重复触发
                span.onanimationend = () => {
                    span.classList.remove('active');
                };
            });
        });
    }
}

// 适配常规加载与 PJAX
initTopPoem();
document.addEventListener('pjax:complete', initTopPoem);