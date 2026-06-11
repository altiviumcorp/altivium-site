const header = document.querySelector("[data-header]");
const tabButtons = [...document.querySelectorAll("[data-tab]")];
const tabPanels = [...document.querySelectorAll("[data-panel]")];
const jumpLinks = [...document.querySelectorAll("[data-jump-tab]")];

function syncHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function activateTab(tabName, updateHash = true) {
  const targetPanel = tabPanels.find((panel) => panel.dataset.panel === tabName);

  if (!targetPanel) {
    return;
  }

  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === tabName;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  tabPanels.forEach((panel) => {
    const isActive = panel.dataset.panel === tabName;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });

  if (updateHash) {
    history.replaceState(null, "", `#${tabName}`);
  }
}

function scrollToTabs() {
  document.querySelector("#tabs").scrollIntoView({ behavior: "smooth", block: "start" });
}

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activateTab(button.dataset.tab);
  });
});

jumpLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    activateTab(link.dataset.jumpTab);
    scrollToTabs();
  });
});

const initialTab = window.location.hash.replace("#", "");
if (initialTab) {
  activateTab(initialTab, false);
}
