document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }

  // Theme toggle functionality
  themeToggle?.addEventListener('click', () => {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', 'dark');
    } else {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('theme', 'light');
    }
  });

  // Hamburger menu functionality
  const menuButton = document.getElementById('hamburger-menu');
  const mobileNav = document.getElementById('mobile-nav');

  menuButton?.addEventListener('click', () => {
    mobileNav.classList.toggle('visible');
    menuButton.classList.toggle('open');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuButton.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('visible');
      menuButton.classList.remove('open');
    }
  });
});
