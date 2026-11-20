const notice = document.querySelector('.notice');
let noticeTimer;

document.querySelectorAll('[data-notice]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    notice.textContent = link.dataset.notice;
    notice.classList.add('is-visible');

    window.clearTimeout(noticeTimer);
    noticeTimer = window.setTimeout(() => {
      notice.classList.remove('is-visible');
    }, 2600);
  });
});
