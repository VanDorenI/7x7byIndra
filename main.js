async function loadWork() {
  const res = await fetch("7x7 afbeeldingen/_work.json");
  const projects = await res.json();
  console.log(projects);
  createGallery(projects);
}

function createGallery(projects) {
  const container = document.querySelector("#archive-container");
  for (const project of projects) {
    const image = document.createElement("img");
    image.src = "7x7 afbeeldingen/" + project.image;
    image.dataset.year = project.year;
    image.dataset.html = project.html;
    image.addEventListener("click", showGalleryPopup);
    container.appendChild(image);
  }
}

function showGalleryPopup(e) {
  console.log("clickced!!!", e);
  const image = e.target;
  document.querySelector("#archive-popup-image").src = image.src;
  document.querySelector("#archive-popup-year").textContent =
    image.dataset.year;
  document.querySelector("#archive-mask").style.display = "block";
  document.body.style.overflow = "hidden";
  document.querySelector("#archive-popup").scrollTop = 0;
  document.querySelector("#archive-popup-button-live").href =
    image.dataset.html;
  document.querySelector("#archive-popup-button-code").dataset.html =
    image.dataset.html;
}

function hideGalleryPopup() {
  document.querySelector("#archive-mask").style.display = "none";
  document.querySelector("#archive-popup-image").style.display = "block";
  document.querySelector("#archive-popup-iframe").style.display = "none";
  document.querySelector("#archive-popup-code-wrapper").style.display = "none";
  document.body.style.overflow = "unset";
}

function showImageVersion(e) {
  e.stopPropagation();
  document.querySelector("#archive-popup-image").style.display = "block";
  document.querySelector("#archive-popup-iframe").style.display = "none";
  document.querySelector("#archive-popup-code-wrapper").style.display = "none";

  document.querySelector("#archive-popup-button-image").classList.add("active");
  document
    .querySelector("#archive-popup-button-live")
    .classList.remove("active");
  document
    .querySelector("#archive-popup-button-code")
    .classList.remove("active");
}

function showLiveVersion(e) {
  e.stopPropagation();
}
//   const button = e.target;
//   const html = button.dataset.html;
//   document.querySelector("#archive-popup-iframe").style.display = "block";
//   document.querySelector("#archive-popup-iframe").src = html;
//   document.querySelector("#archive-popup-image").style.display = "none";
//   document.querySelector("#archive-popup-code-wrapper").style.display = "none";

//   document
//     .querySelector("#archive-popup-button-image")
//     .classList.remove("active");
//   document.querySelector("#archive-popup-button-live").classList.add("active");
//   document
//     .querySelector("#archive-popup-button-code")
//     .classList.remove("active");
// }

async function showCodeVersion(e) {
  // debugger;
  e.stopPropagation();
  const button = e.target;
  const html = button.dataset.html;

  document.querySelector("#archive-popup-code-wrapper").style.display = "block";
  document.querySelector("#archive-popup-image").style.display = "none";
  document.querySelector("#archive-popup-iframe").style.display = "none";

  document
    .querySelector("#archive-popup-button-image")
    .classList.remove("active");
  document
    .querySelector("#archive-popup-button-live")
    .classList.remove("active");
  document.querySelector("#archive-popup-button-code").classList.add("active");
  document.querySelector("#archive-popup-code-wrapper").scrollTop = 0;

  const res = await fetch(html);
  const htmlCode = await res.text();
  const dom = new DOMParser().parseFromString(htmlCode, "text/html");
  const scripts = dom.querySelectorAll("script");
  let myScript = scripts[1].textContent;
  const lines = myScript.split("\n");
  const cleanLines = lines.map((line) => line.substring(6));
  myScript = cleanLines.join("\n");
  document.querySelector("#archive-popup-code").textContent = myScript;
  hljs.highlightAll();
}

loadWork();
document
  .querySelector("#archive-mask")
  .addEventListener("click", hideGalleryPopup);

document
  .querySelector("#archive-popup-button-live")
  .addEventListener("click", showLiveVersion);

document
  .querySelector("#archive-popup-button-image")
  .addEventListener("click", showImageVersion);

document
  .querySelector("#archive-popup-button-code")
  .addEventListener("click", showCodeVersion);
