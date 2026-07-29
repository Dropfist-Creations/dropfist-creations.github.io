const lightbox = document.querySelector("#screenshot-lightbox");
const lightboxImage = lightbox?.querySelector("img");
const closeButton = lightbox?.querySelector(".lightbox-close");
const previousButton = lightbox?.querySelector(".lightbox-prev");
const nextButton = lightbox?.querySelector(".lightbox-next");
const galleryTriggers = Array.from(document.querySelectorAll(".phone-lightbox-trigger"));
let lastFocusedTrigger = null;
let currentIndex = 0;

function showImage(index) {
  if (!lightboxImage || galleryTriggers.length === 0) return;
  currentIndex = (index + galleryTriggers.length) % galleryTriggers.length;
  const trigger = galleryTriggers[currentIndex];
  lightboxImage.src = trigger.dataset.full || "";
  lightboxImage.alt = trigger.dataset.alt || "App screenshot";
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  lightboxImage.alt = "";
  document.body.classList.remove("lightbox-open");
  lastFocusedTrigger?.focus();
}

galleryTriggers.forEach((trigger, index) => {
  trigger.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;
    lastFocusedTrigger = trigger;
    showImage(index);
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    closeButton?.focus();
  });
});

closeButton?.addEventListener("click", closeLightbox);
previousButton?.addEventListener("click", () => showImage(currentIndex - 1));
nextButton?.addEventListener("click", () => showImage(currentIndex + 1));

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (lightbox?.getAttribute("aria-hidden") !== "false") return;

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowLeft") {
    showImage(currentIndex - 1);
  }

  if (event.key === "ArrowRight") {
    showImage(currentIndex + 1);
  }
});
