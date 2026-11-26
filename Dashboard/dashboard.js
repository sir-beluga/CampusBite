const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

menuToggle.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav-link').forEach((item) => {
      item.classList.remove('active');
      item.removeAttribute('aria-current');
    });
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
    sidebar.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    if (link.getAttribute('href') !== '#dashboard' && !document.querySelector(link.getAttribute('href'))) {
      showToast(`${link.textContent.trim()} is coming soon.`);
    }
  });
});

document.getElementById('newComplaint').addEventListener('click', () => {
  const description = window.prompt('Briefly describe your complaint:');
  if (description && description.trim()) showToast('Your complaint has been submitted.');
});

document.getElementById('logoutLink').addEventListener('click', (event) => {
  event.preventDefault();
  showToast('You are signed out of this demo.');
});
