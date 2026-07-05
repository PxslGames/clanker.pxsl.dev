const grid = document.getElementById("commandsGrid");
const search = document.getElementById("search");
const count = document.getElementById("count");

let commands = [];

function formatOptions(options) {
  if (!options || options.length === 0) return "";

  return options.map(opt => {
    return `• ${opt.name} (${opt.required ? "required" : "optional"})`;
  }).join("<br>");
}

function render(list) {
  grid.innerHTML = "";

  list.forEach(cmd => {
    const card = document.createElement("div");
    card.className = "command-card";

    const optionsHTML = formatOptions(cmd.options);

    card.innerHTML = `
      <div class="command-name">/${cmd.name}</div>
      <div class="command-desc">${cmd.description || "No description"}</div>

      ${optionsHTML ? `<div class="command-desc" style="margin-top:8px;">
        <strong>Options:</strong><br>${optionsHTML}
      </div>` : ""}

      <div class="command-tag">
        ${cmd.type === 1 ? "Slash Command" : "Command"}
      </div>
    `;

    grid.appendChild(card);
  });

  count.textContent = `${list.length} commands`;
}

search.addEventListener("input", () => {
  const value = search.value.toLowerCase();

  const filtered = commands.filter(c =>
    c.name.toLowerCase().includes(value) ||
    (c.description || "").toLowerCase().includes(value)
  );

  render(filtered);
});

// LOAD FROM JSON
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    commands = data;
    render(commands);
  })
  .catch(err => {
    console.error("Failed to load commands:", err);
    count.textContent = "failed to load commands";
  });