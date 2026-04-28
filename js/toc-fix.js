// 延迟启用 TOC 过渡，避免首次渲染造成卡顿或回位
(function() {
  function enableTocTransition() {
    document.documentElement.classList.add('toc-ready')
  }

  if (document.readyState === 'complete') {
    enableTocTransition()
  } else {
    window.addEventListener('load', enableTocTransition)
    // 兼容 pjax 完成场景
    document.addEventListener('pjax:complete', enableTocTransition)
  }
})();
