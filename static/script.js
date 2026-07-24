function getRandomDiscordAvatar() {
  return `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 5)}.png`;
}

async function loadReviews() {
  const res = await fetch("/reviews.json");
  const reviews = await res.json();

  const track = document.getElementById("reviewsRow");
  if (!track) return;

  function createCard(r) {
    const card = document.createElement("div");
    card.className = "review-card";

    const stars = "⭐".repeat(r.rating || 5);

    card.innerHTML = `
      <img class="review-avatar" src="${getRandomDiscordAvatar()}" />

      <div class="review-body">
        <div class="review-name">
          ${r.name}
          <span class="review-stars">${stars}</span>
        </div>
        <div class="review-quote">${r.text}</div>
      </div>
    `;

    return card;
  }

  // Original reviews
  reviews.forEach(r => track.appendChild(createCard(r)));

  // Duplicate them for seamless looping
  reviews.forEach(r => track.appendChild(createCard(r)));

  const row = document.getElementById("reviewsRow");

  let scroll = 0;

  // Current speed
  let speed = 0.5;

  // Target speed (used for smooth acceleration)
  let targetSpeed = 0.5;

  function animate() {
    // Smoothly move towards the target speed
    speed += (targetSpeed - speed) * 0.12;

    scroll += speed;

    if (scroll >= row.scrollWidth / 2) {
      scroll = 0;
    }

    row.scrollLeft = scroll;

    requestAnimationFrame(animate);
  }

  setTimeout(animate, 500);

  // Hold click to speed up
  row.addEventListener("mousedown", () => {
    targetSpeed = 3;
  });

  window.addEventListener("mouseup", () => {
    targetSpeed = 0.5;
  });

  // If they drag outside the window while holding
  window.addEventListener("mouseleave", () => {
    targetSpeed = 0.5;
  });

  // Mobile support
  row.addEventListener("touchstart", () => {
    targetSpeed = 3;
  }, { passive: true });

  window.addEventListener("touchend", () => {
    targetSpeed = 0.5;
  });

  window.addEventListener("touchcancel", () => {
    targetSpeed = 0.5;
  });
}

loadReviews();