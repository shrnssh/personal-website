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
  triviaText.textContent = triviaFacts[index].fact;

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

// Fetch facts and initialize
fetchTriviaFacts();

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("hamburger-menu");
  const mobileNav = document.getElementById("mobile-nav");

  menuButton.addEventListener("click", () => {
    mobileNav.classList.toggle("hidden");
  });
});
