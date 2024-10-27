// Improved slideshow functionality
let slideIndex = 1;
let slideTimer;
showSlides(slideIndex);

function currentSlide(n) {
  clearTimeout(slideTimer);
  showSlides((slideIndex = n));
}

function plusSlides(n) {
  clearTimeout(slideTimer);
  showSlides((slideIndex += n));
}

function showSlides(n) {
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  Array.from(slides).forEach((slide) => {
    slide.style.display = "none";
    slide.classList.remove("animate__fadeIn");
  });
  Array.from(dots).forEach((dot) => dot.classList.remove("active"));

  slides[slideIndex - 1].style.display = "block";
  slides[slideIndex - 1].classList.add("animate__fadeIn");
  dots[slideIndex - 1].classList.add("active");

  // Auto advance slides
  slideTimer = setTimeout(() => plusSlides(1), 5000);
}

// Celebration effects
let isCelebrating = false;
const CONFETTI_COLORS = ["#ff69b4", "#ff1493", "#ffd700", "#ff6347", "#87ceeb"];
const ANIMATION_DURATION = 20000;

document
  .getElementById("celebrateButton")
  .addEventListener("click", function () {
    if (!isCelebrating) {
      startCelebration();
    }
  });

function startCelebration() {
  isCelebrating = true;
  const confetti = document.getElementById("confetti");
  const balloons = document.getElementById("balloons");
  const hearts = document.getElementById("hearts");

  // Show containers
  confetti.classList.remove("hidden");
  balloons.classList.remove("hidden");
  hearts.classList.remove("hidden");

  // Start effects
  const confettiInterval = setInterval(() => createConfetti(confetti), 50);
  const heartInterval = setInterval(() => createHeart(hearts), 300);
  createBalloons(balloons);

  // Add button animation
  const button = document.getElementById("celebrateButton");
  button.classList.add("celebrating");

  // Stop celebration after duration
  setTimeout(() => {
    clearInterval(confettiInterval);
    clearInterval(heartInterval);
    confetti.classList.add("hidden");
    balloons.classList.add("hidden");
    hearts.classList.add("hidden");
    button.classList.remove("celebrating");
    confetti.innerHTML = "";
    balloons.innerHTML = "";
    hearts.innerHTML = "";
    isCelebrating = false;
  }, ANIMATION_DURATION);
}

function createConfetti(container) {
  const confetti = document.createElement("div");
  confetti.classList.add("confetti-piece");

  const size = Math.random() * 10 + 5;
  const color =
    CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];

  confetti.style.width = `${size}px`;
  confetti.style.height = `${size}px`;
  confetti.style.backgroundColor = color;
  confetti.style.left = `${Math.random() * 100}vw`;
  confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

  container.appendChild(confetti);

  // Animate falling
  const animation = confetti.animate(
    [
      { top: "-5vh", transform: `rotate(0deg)` },
      { top: "105vh", transform: `rotate(${720 + Math.random() * 360}deg)` },
    ],
    {
      duration: 3000 + Math.random() * 2000,
      easing: "cubic-bezier(.25,.46,.45,.94)",
    }
  );

  animation.onfinish = () => confetti.remove();
}

function createBalloons(container) {
  for (let i = 0; i < 15; i++) {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");

    const color =
      CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    balloon.style.backgroundColor = color;
    balloon.style.left = `${Math.random() * 100}vw`;
    balloon.style.animationDelay = `${Math.random() * 2}s`;

    container.appendChild(balloon);

    setTimeout(() => balloon.remove(), 15000);
  }
}

function createHeart(container) {
  const heart = document.createElement("div");
  heart.innerHTML = "❤️";
  heart.classList.add("heart");

  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.animationDuration = `${Math.random() * 2 + 2}s`;
  heart.style.fontSize = `${Math.random() * 20 + 10}px`;

  container.appendChild(heart);

  setTimeout(() => heart.remove(), 3000);
}

function getRandomColor() {
  return CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
}

// Add touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchEndX - touchStartX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      plusSlides(-1); // Swipe right
    } else {
      plusSlides(1); // Swipe left
    }
  }
}
