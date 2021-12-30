// Header
const toggler = document.getElementById("toggler");
const nav = document.querySelector(".header__nav");

if (toggler) {
  toggler.addEventListener("click", () => {
    if (nav) {
      nav.classList.toggle("active");
    }
  });
}

// Before/after slider
const sliderRange = document.getElementById("range");
const catFat = document.querySelector(".cat-fat");
const catSkinny = document.querySelector(".cat-skinny");

if (sliderRange) {
  sliderRange.addEventListener("input", (e) => {
    if (catSkinny) {
      catSkinny.style.width = `${e.target.value}%`;
    }
    if (catFat) {
      catFat.style.width = `${100 - e.target.value}%`;
    }
  });
}
