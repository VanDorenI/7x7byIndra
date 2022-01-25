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
    document.querySelector("#archive-popup").scrollTop=0;
  }
  
  function hideGalleryPopup() {
    
    document.querySelector("#archive-mask").style.display = "none";
    document.body.style.overflow = "unset";
  }
  
  loadWork();
  document
    .querySelector("#archive-mask")
    .addEventListener("click", hideGalleryPopup);
  