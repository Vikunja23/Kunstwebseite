// ===== BILDERLISTE (hier kannst du beliebig erweitern) =====
const bilder = [
  { src: "images/Blume_1.jpg", titel: "Blume 1", info: "Öl · 50×70 cm", tag: "blumen" },
  { src: "images/Blume_2.jpg", titel: "Blume 2", info: "Öl · 40×60 cm", tag: "blumen" },
  { src: "images/Vogel_1.jpg", titel: "Vogel 1", info: "Acryl · 50×40 cm", tag: "tiere" },
  { src: "images/Vogel_2.jpg", titel: "Vogel 2", info: "Acryl · 45×35 cm", tag: "tiere" }
];

// ===== Kategorie aus URL =====
const urlParams = new URLSearchParams(window.location.search);
const kat = urlParams.get("kat");

// Titel setzen
document.getElementById("galerie-titel").textContent =
  kat ? kat.charAt(0).toUpperCase() + kat.slice(1) : "Galerie";

// Bilder filtern
const gefiltert = bilder.filter(b => b.tag === kat);

// ===== MOBILE GRID =====
const mobileGrid = document.getElementById("mobile-grid");

gefiltert.forEach(bild => {
  const img = document.createElement("img");
  img.src = bild.src;
  img.alt = bild.titel;
  mobileGrid.appendChild(img);
});

// ===== DESKTOP KARUSSELL =====
const track = document.getElementById("carousel-track");

gefiltert.forEach(b => {
  const div = document.createElement("div");
  div.className = "car-item";
  div.innerHTML = `
    <img src="${b.src}" alt="${b.titel}">
    <div class="caption">
      <h3>${b.titel}</h3>
      <p>${b.info}</p>
    </div>`;
  track.appendChild(div);
});

let index = 0;

// Buttons
document.getElementById("nextBtn").addEventListener("click", () => {
  index = (index + 1) % gefiltert.length;
  updateCarousel();
});

document.getElementById("prevBtn").addEventListener("click", () => {
  index = (index - 1 + gefiltert.length) % gefiltert.length;
  updateCarousel();
});

function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;
}
