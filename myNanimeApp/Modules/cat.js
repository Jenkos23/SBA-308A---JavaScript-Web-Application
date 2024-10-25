
// Modules/cat.js

const catBreedUrl = "https://api.thecatapi.com/v1/breeds";
// const singleCatBreedUrl = "https://api.thecatapi.com/v1/images/search?breed_ids=";
const singleCatBreedUrl = "https://api.thecatapi.com/v1/images/";
const uploadImageUrl = "https://api.thecatapi.com/v1/images/upload";
const API_KEY =
  "live_fmjjiIsCxnMq92eAof05df2TA9pTo6VVgv36vX1hIy14C0NYhKDhipxgdQOr7XDi";

export const fetchCatData = async () => {
    try {
        const response = await fetch(
            catBreedUrl,
            {
              headers: {
                "x-api-key": API_KEY,
              },
            }
        );
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("An error occurred fetching the cat:", error);
    }
};



export const fetchCatBreedbyID = async (id) => {
    try {
        const response = await fetch(
          singleCatBreedUrl + id,
            {
              headers: {
                "x-api-key": API_KEY,
              },
            }
        );
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("An error occurred fetching the cat:", error);
    }
};


//function for using POST METHOD to post file
export const uploadImage = async () => {
  
  try {
      const response = await fetch(uploadImageUrl , {
          method: "POST", 
          headers: {
              "x-api-key": API_KEY,
              
          },
          body: formData, 
      });

      if (!response.ok) {
          throw new Error("Network response was not ok: " + response.statusText);
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error("An error occurred uploading the image:", error);
  }
};


console.log(await fetchCatData());
