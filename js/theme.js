function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.textContent = theme === "dark" ? "Modo claro" : "Modo oscuro";
  }
}

function initTheme() {
  let theme = "light";
  try {
    theme = localStorage.getItem("tarjetas-tema") || "light";
  } catch (e) {}
  applyTheme(theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  try {
    localStorage.setItem("tarjetas-tema", next);
  } catch (e) {}
}

initTheme();
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("themeToggle");
  if (btn) btn.addEventListener("click", toggleTheme);
});
