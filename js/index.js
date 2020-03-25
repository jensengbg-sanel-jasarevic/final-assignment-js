const flickrForm = document.getElementById("flickr-form");
let searchValue = document.getElementById("flickr-search");
let flickrOutput = document.getElementById("flickr-output");
let lightBox = document.getElementById("light-box");
let closeButton = document.getElementById("close-button");

flickrForm.addEventListener("submit", e => {
    e.preventDefault();
      getData();
      clearImages();
});

//Clear the images when new search is made
function clearImages() {
  flickrOutput.innerHTML = "";
}

function getData() {
    let perPage = document.getElementById("select-option").value;
    let searchedText = searchValue.value;
    const apiKey = "19d3e6e0acfe9c438f368e2c2bab1c5d";
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${searchedText}&per_page=${perPage}&format=json&nojsoncallback=1`;

  fetch(url)
    .then(res => res.json())
     .then(data => {
        data.photos.photo.forEach(img => {
        const photoUrl = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`;
        flickrOutput.innerHTML += `<img src="${photoUrl}">`;

        const imgArr = document.querySelectorAll("#flickr-output img");

        imgArr.forEach(img =>
          img.addEventListener("click", e => {
            const imgLightbox = document.querySelector("#img-lightbox img");
            /* Get src attribute from img clicked, then set the attribute to
            the variable imgLightbox that is going to be shown for user */
            const imgSrc = e.target.getAttribute("src");
            imgLightbox.setAttribute("src", imgSrc);
            document.getElementById("light-box").classList.add("display-photo");
          })
        );
       });
     })
     .catch(error => console.log(error));
 }
 
 //Close button for the lightbox, removes the class made for the lightbox when you close the event
closeButton.addEventListener("click", () => {
  lightBox.classList.remove("display-photo");
});