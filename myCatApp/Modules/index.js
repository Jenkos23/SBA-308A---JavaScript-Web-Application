// Modules/index.js

import * as fromCatjs from './cat.js';

const uploadImg = document.querySelector('input[type="file"]');
const postButton = document.getElementById('postBtn');
const catButton = document.getElementById("getSearchBtn");
// const postButton = document.getElementById("postBtn");
const catSelect = document.getElementById("catSelect");
const carouselInner = document.getElementById("carouselInner");
var selectedCatBreedId = "";
var postFormData;



// Load cat data and populate the select dropdown
async function loadCat() {
    try {
        const catData = await fromCatjs.fetchCatData();

        if (catData && catData.length > 0) {
            selectedCatBreedId = catData[0].reference_image_id;

            // Assuming that catData should be an array,
            catSelect.innerHTML = ''; // Clear existing options


        
            catData.forEach(cat => {
                const option = document.createElement("option");
                option.value = cat.reference_image_id; 
                option.textContent = cat.name; 
                catSelect.appendChild(option);
            });
        }
    } catch (error) {
        console.error("Error loading cats:", error);
    }
}

//Event listener to catSelect options
catSelect.addEventListener("change", async () =>{
    // console.log(catSelect?.value);
    selectedCatBreedId = catSelect?.value;
})

// Event listener for button click
catButton.addEventListener("click", async () => {
    // We call the fetchCatData() function to get cat details
    const catDetails = await fromCatjs.fetchCatBreedbyID(selectedCatBreedId); 
   
    // Display the cat details
    displayCat(catDetails);
});




function displayCat(cat) {
    carouselInner.innerHTML = ""; // Clear existing carousel items

    if (cat) {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item d-flex active'; // Set the first item to active

        const catImage = document.createElement('img');
        catImage.src = cat.url; 
        catImage.className = 'd-block w-50';
        catImage.alt = cat.name;

        const catDescription = document.createElement("div");
        catDescription.className = 'cat-desc'
        
        const imageTitle = document.createElement("h1");
        imageTitle.innerHTML = cat.breeds[0].name;

        const imageDescription = document.createElement("p");
        imageDescription.innerHTML = cat.breeds[0].description;
        imageDescription.style.color = "blue";

        

        carouselItem.appendChild(catImage);
        carouselItem.appendChild(catDescription);
        catDescription.appendChild(imageTitle);
        catDescription.appendChild(imageDescription);
        carouselInner.appendChild(carouselItem);
        
    }
}

// Load cat data on initial load
loadCat();




//Post 

uploadImg.addEventListener("change", (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    postFormData = formData; 
});

postButton.addEventListener("click", async () => {
    if (!postFormData) {
        console.error("No file selected for upload.");
        return;
    }

    try {
        const postDetails = await fromCatjs.uploadImage(postFormData);
        console.log(postDetails);
    } catch (error) {
        console.error("Error uploading image:", error);
    }
});







