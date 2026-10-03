const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("#main-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const backTop = document.querySelector(".back-top");

function closeMenu() {
  if (!menuToggle || !navMenu) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
  navMenu.classList.remove("open");
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
    navMenu.classList.toggle("open", !isOpen);
  });

  navLinks.forEach(link => link.addEventListener("click", closeMenu));

  document.addEventListener("click", (event) => {
    if (window.innerWidth <= 850 && navMenu.classList.contains("open") &&
        !navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });
}

const revealElements = document.querySelectorAll(".reveal");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(el => observer.observe(el));
} else {
  revealElements.forEach(el => el.classList.add("visible"));
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) backTop.classList.add("visible");
  else backTop.classList.remove("visible");
}, { passive: true });

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 850) closeMenu();
});
