document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
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

  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevents unwanted closing when clicking the button

      mobileNav.classList.toggle('visible');
      menuButton.classList.toggle('open');

      // Change icon
      menuButton.innerHTML = menuButton.classList.contains('open') 
        ? '<i class="fas fa-times"></i>' // 'X' when open
        : '<i class="fas fa-bars"></i>'; // Hamburger when closed
    });

    // Prevent clicks inside the menu from affecting anything else
    mobileNav.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
});
