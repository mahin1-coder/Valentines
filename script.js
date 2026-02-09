const heartBtn = document.getElementById("heart-btn");
const response = document.getElementById("response");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");

const messages = [
  "Okay fine, I already saved us a seat 💖",
  "Yes?! I’ll bring the snacks 🍓",
  "Match made in Hello Kitty heaven 🎀",
  "We’re officially a rom-com now 💘"
];

let moveCount = 0;

heartBtn.addEventListener("click", () => {
  moveCount += 1;
  const offsetX = (Math.random() - 0.5) * 120;
  const offsetY = (Math.random() - 0.5) * 80;
  heartBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  heartBtn.style.transition = "transform 0.25s ease";

  if (moveCount % 2 === 0) {
    response.textContent = messages[Math.floor(Math.random() * messages.length)];
  }
});

yesBtn.addEventListener("click", () => {
  response.textContent = "Yay! See you at 7pm 💕";
});

noBtn.addEventListener("click", () => {
  response.textContent = "I’ll be here with snacks until you change your mind 😌";
});
