// Before/after slider
const sliderRange = document.getElementById("range");
const catFat = document.querySelector(".cat-fat");
const catSkinny = document.querySelector(".cat-skinny");

sliderRange.addEventListener("input", (e) => {
  if (catFat) {
    catFat.style.width = `${e.target.value}%`;
  }
  if (catSkinny) {
    catSkinny.style.width = `${100 - e.target.value}%`;
  }
});
