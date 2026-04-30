const header = document.querySelector("[data-header]");

function syncHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });
