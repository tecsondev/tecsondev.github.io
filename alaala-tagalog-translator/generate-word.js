import nouns from "./resources/nouns.js";
import adjectives from "./resources/adjectives.js";
import verbs from "./resources/verbs.js";

const wordBtn = document.getElementById("word-btn");
wordBtn.addEventListener("click", generateWord);

function generateWord() {
  let funnel = Math.floor(Math.random() * 4);
  if (funnel === 0) {
    funnel = 1;
  }
  let index;
  let word = "";
  switch (funnel) {
    case 1:
      //noun
      index = Math.round(Math.random() * nouns.length);
      word = nouns[index];
      break;
    case 2:
      //adjective
      index = Math.round(Math.random() * adjectives.length);
      word = adjectives[index];
      break;
    case 3:
      //verb
      index = Math.round(Math.random() * verbs.length);
      word = verbs[index];
      break;
    default:
      break;
  }

  async function translateWord() {
    const url = "https://translation.googleapis.com/language/translate/v2?key=AIzaSyDN_2wHNKRVNDy8p8uFKDGvTKtzbWvXKe4";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          q: `${word}`,
          source: "en",
          target: "tl",
          format: "text",
        }),
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }

      const json = await response.json();
      let translatedWord = json.data.translations["0"].translatedText.toString();
      document.getElementById("translate-text").innerHTML = `${translatedWord}`;
    } catch (error) {
      console.error(error.message)
    }
  }
  
  translateWord();
  document.getElementById("word-text").innerHTML = `${word}`;
  document.getElementById("translate-text").style.display = "none";
  document.getElementById("translate-default").style.display = "flex";
}

export default generateWord;