const form = document.querySelector("form");
const searchValue = document.querySelector("input");
const flickrOutputImages = document.getElementById("flickr-output");

const lightBox = document.getElementById("light-box");
const closeLightBox = document.getElementById("close");

// Event listener for submit button in the form
form.addEventListener("submit", e => {
    e.preventDefault();
      // Fetch & display images to DOM
      getData();
      // Update DOM by removing old retrieved images 
      clearImages();
});

 // Close lightbox, removes class that is created when clicking specific image
 closeLightBox.addEventListener("click", () => {
  lightBox.classList.remove("display-photo");
});

function clearImages() {
  flickrOutputImages.innerHTML = "";
}

function getData() {
    let perPage = document.getElementById("select-option").value;
    let searchText = searchValue.value;
    const API_KEY = "19d3e6e0acfe9c438f368e2c2bab1c5d";
    const API_URL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${searchText}&per_page=${perPage}&format=json&nojsoncallback=1`;

  fetch(API_URL)
    .then(res => res.json())
     .then(data => {
        data.photos.photo.forEach(img => {
        const photoURL = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`;
        
        // Create img tag & display images in DOM
        flickrOutputImages.innerHTML += `<img src="${photoURL}">`;

        // Now collect all images displayed in DOM (img tag now include source for image)
        const flickrImages = document.querySelectorAll("#flickr-output img");

        // Event listener for image
        flickrImages.forEach(img =>
          img.addEventListener("click", e => {
            const imgLightbox = document.querySelector("#image img");
            
              // 1. Get src attribute from clicked event
              // 2. Assign src value to img element in section tag that has id of 'image'
              const imgSrc = e.target.getAttribute("src");
              imgLightbox.setAttribute("src", imgSrc);

              // Add class for 'light-box' element
              document.getElementById("light-box").classList.add("display-photo");
            })
          );
       });
     })
     .catch(error => console.log(error));
 }