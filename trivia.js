let currentIndex = 0;
let triviaFacts = [];

async function fetchTriviaFacts() {
  try {
    const response = await fetch('facts.json'); // Load the JSON file
    triviaFacts = await response.json(); // Parse JSON data
    displayTrivia(currentIndex); // Display the first fact
  } catch (error) {
    console.error('Error fetching trivia facts:', error);
  }
}

function displayTrivia(index) {
  const triviaDate = document.getElementById("trivia-date");
  const triviaText = document.getElementById("trivia-text");
  const prevTrivia = document.getElementById("prev-trivia");
  const nextTrivia = document.getElementById("next-trivia");

  // Update trivia content
  triviaDate.textContent = triviaFacts[index].date;
  triviaText.innerHTML = triviaFacts[index].fact; // Use innerHTML to parse the HTML content

  // Enable/disable navigation links
  prevTrivia.style.display = index === 0 ? "none" : "inline-block";
  nextTrivia.style.display = index === triviaFacts.length - 1 ? "none" : "inline-block";
}

// Navigation
document.getElementById("prev-trivia").addEventListener("click", (e) => {
  e.preventDefault();
  if (currentIndex > 0) {
    currentIndex--;
    displayTrivia(currentIndex);
  }
});

document.getElementById("next-trivia").addEventListener("click", (e) => {
  e.preventDefault();
  if (currentIndex < triviaFacts.length - 1) {
    currentIndex++;
    displayTrivia(currentIndex);
  }
});

// Hamburger Menu Functionality
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("hamburger-menu");
  const mobileNav = document.getElementById("mobile-nav");

  if (menuButton && mobileNav) {
    menuButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevents unwanted closing when clicking the button

      mobileNav.classList.toggle("visible");
      menuButton.classList.toggle("open");

      // Change icon
      menuButton.innerHTML = menuButton.classList.contains("open") 
        ? '<i class="fas fa-times"></i>' // 'X' when open
        : '<i class="fas fa-bars"></i>'; // Hamburger when closed
    });

    // Prevent menu from closing when clicking inside
    mobileNav.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // Close menu only when clicking the hamburger button again
    document.addEventListener("click", (e) => {
      if (!menuButton.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove("visible");
        menuButton.classList.remove("open");
        menuButton.innerHTML = '<i class="fas fa-bars"></i>'; // Reset to hamburger icon
      }
    });
  }
});

// Fetch facts and initialize
fetchTriviaFacts();
