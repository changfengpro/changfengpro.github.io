// scripts/smooth-scroll.js
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.toc-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href'); // 直接获取拼音格式的 ID（如 #jlink-shua-gu-jian-jiao-cheng）
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});