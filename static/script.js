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

  // fill
  reviews.forEach(r => track.appendChild(createCard(r)));

  // duplicate for looping illusion
  reviews.forEach(r => track.appendChild(createCard(r)));

  let scroll = 0;
  const row = document.getElementById("reviewsRow");

  function animate() {
    scroll += 0.5;
    if (scroll >= row.scrollWidth / 2) scroll = 0;
    row.scrollLeft = scroll;
    requestAnimationFrame(animate);
  }

  setTimeout(() => animate(), 500);
}

loadReviews();