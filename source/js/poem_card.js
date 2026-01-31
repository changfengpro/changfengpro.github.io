/* source/js/poem_card.js */
function initPoemCard() {
    // 1. 寻找侧边栏容器
    const asideContent = document.querySelector('#aside-content');
    if (!asideContent) return;

    // 2. 如果卡片已存在则不重复创建 (防止 PJAX 重复挂载)
    if (document.getElementById('card-poem')) return;

    // 3. 创建独立卡片 HTML 结构
    const card = document.createElement('div');
    card.className = 'card-widget card-poem';
    card.id = 'card-poem';
    card.innerHTML = `
      <div class="item-headline">
        <i class="fas fa-feather-alt"></i>
        <span>每日诗词</span>
      </div>
      <div style="padding: 12px; text-align: center;">
        <div id="poem_content" style="font-size: 1.05em; line-height: 1.6; min-height: 50px;">正在研墨...</div>
        <div id="poem_info" style="font-size: 0.85em; color: #858585; margin-top: 10px; text-align: right;"></div>
      </div>
    `;

    // 4. 插入到侧边栏（公告栏下方）
    const announcement = asideContent.querySelector('.card-announcement');
    if (announcement) {
        announcement.insertAdjacentElement('afterend', card);
    } else {
        asideContent.appendChild(card);
    }

    // 5. 调用今日诗词接口
    if (typeof jinrishici !== 'undefined') {
        jinrishici.load(res => {
            const content = document.getElementById('poem_content');
            const info = document.getElementById('poem_info');
            if (content) content.innerHTML = res.data.content;
            if (info) info.innerHTML = '—— ' + res.data.origin.author;
        });
    }
}

// 适配普通加载和 PJAX
initPoemCard();
document.addEventListener('pjax:complete', initPoemCard);