// arrange api
// get json data from api
// loop them and create img elems
// window scroll event listener
// think about loader postion and when it should appear.


let photosArray = []
const photoContainer = document.getElementById("image-container")
// api settings
const count = 10;
const accessKey = "PDOnt6YX6LJFItbGjX_sVSPu-BmjFDOkwBirVg_QckI";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`


let totalImages = 0;
let imagesLoaded = 0;
let ready = false;


function imageLoaded() {
    console.log("image loaded");
    imagesLoaded++;
    console.log(imagesLoaded, totalImages);
    if (imagesLoaded === totalImages ) {
        ready= true;
        loader.hidden = true;

        console.log("ready is: ", ready);
    }
}



function setAttributes(elem, attributes) {
    for (const key in attributes) {
        elem.setAttribute(key, attributes[key]);
    }
}

function displayingPhoto() {
    imagesLoaded=0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        //create item element
        const item = document.createElement("a");
        // item.setAttribute("href", photo.links.html );
        // item.setAttribute("target", "_blank");

        setAttributes(item, {
            href: photo.links.html,
            target: "_blank"
        })

        // create image Element
        const image = document.createElement("img");
        // image.setAttribute("src", photo.urls.regular);
        // image.setAttribute("alt", photo.alt_description);
        // image.setAttribute("title", photo.alt_description);

        setAttributes(image, {
            "src": photo.urls.regular,
            "alt": photo.alt_description,
            "title": photo.alt_description
        })

        //child settings
        item.appendChild(image);
        photoContainer.appendChild(item);

        imageLoaded();

        
    }); 
}



//get photos from unsplash
async function getPhotos() {
    
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayingPhoto();
        
    } catch(err) {
        console.log("error happened: ", err)
    }

}


//check to see if scroll is near the bottom
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
        console.log("you should load more images!");
    }
})


//onLoading Page
getPhotos();
