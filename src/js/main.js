import { initMenu } from "./modules/menu.js";
import { initGallery } from "./modules/gallery.js";
import { initQuantity } from "./modules/quantity.js";
import { initCart } from "./modules/cart.js";
import { initWishlist } from "./modules/wishlist.js";
import { initReviews } from "./modules/reviews.js";
import { initSearch } from "./modules/search.js";
import { initCheckout } from "./modules/checkout.js";

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initGallery();
  initQuantity();
  initCart();
  initWishlist();
  initReviews();
  initSearch();
  initCheckout();

  const anoAtual = document.getElementById("anoAtual");
  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }
});
