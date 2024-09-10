const translateText = document.getElementById("translate-text");
const translateDefault = document.getElementById("translate-default");

function displayTranslation() {
  translateText.style.display = "flex";
  translateDefault.style.display = "none";
}

const translateBtn = document.getElementById("translate-btn");
translateBtn.addEventListener("click", displayTranslation);

export default displayTranslation;