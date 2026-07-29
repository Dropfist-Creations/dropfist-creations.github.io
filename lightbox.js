const lightbox = document.querySelector("#screenshot-lightbox");
const lightboxImage = lightbox?.querySelector("img");
const closeButton = lightbox?.querySelector(".lightbox-close");
let lastFocusedTrigger = null;

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  lightboxImage.alt = "";
  document.body.classList.remove("lightbox-open");
  lastFocusedTrigger?.focus();
}

document.querySelectorAll(".phone-lightbox-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;
    lastFocusedTrigger = trigger;
    lightboxImage.src = trigger.dataset.full || "";
    lightboxImage.alt = trigger.dataset.alt || "App screenshot";
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    closeButton?.focus();
  });
});

closeButton?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox?.getAttribute("aria-hidden") === "false") {
    closeLightbox();
  }
});
