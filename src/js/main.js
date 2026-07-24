import { initMenu } from "./modules/menu.js";
import { initGallery } from "./modules/gallery.js";
import { initQuantity } from "./modules/quantity.js";
import { initCart } from "./modules/cart.js";
import { initReviews } from "./modules/reviews.js";
import { initSearch } from "./modules/search.js";
import { initCheckout } from "./modules/checkout.js";
import { initScrollReveal } from "./modules/scroll-reveal.js";
import { initWishlist } from "./modules/extras.js";

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initGallery();
  initQuantity();
  initCart();
  initReviews();
  initSearch();
  initCheckout();
  initScrollReveal();
  initWishlist();

  const anoAtual = document.getElementById("anoAtual");
  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch((err) => {
      console.log("SW registration failed:", err);
    });
  }
});
