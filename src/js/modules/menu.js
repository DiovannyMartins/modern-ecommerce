const menuToggle = document.getElementById("menuToggle");
const menu = document.querySelector(".menu");

/**
 * Inicializa o menu mobile
 */
export function initMenu() {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
    const isOpen = menu.classList.contains("active");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  const menuLinks = document.querySelectorAll(".menu a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("active")) {
      menu.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.focus();
    }
  });
}
