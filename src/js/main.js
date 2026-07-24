import { initMenu } from "./modules/menu.js";
import { initGallery } from "./modules/gallery.js";
import { initQuantity } from "./modules/quantity.js";
import { initCart } from "./modules/cart.js";
import { initReviews } from "./modules/reviews.js";
import { initSearch } from "./modules/search.js";
import { initCheckout } from "./modules/checkout.js";
import { initScrollReveal } from "./modules/scroll-reveal.js";

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initGallery();
  initQuantity();
  initCart();
  initReviews();
  initSearch();
  initCheckout();
  initScrollReveal();

  const anoAtual = document.getElementById("anoAtual");
  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }
});
