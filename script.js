// Array of image URLs
const imageUrls = [
  { url: 'https://example.com/image1.jpg', alt: 'Image 1' },
  { url: 'https://example.com/image2.jpg', alt: 'Image 2' },
  // Add more image URLs here
];

// Function to download an image and return a promise
function downloadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ image, element: img });
    img.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
    img.src = image.url;
  });
}

// Function to download all images using Promise.all and display them
function downloadAndDisplayImages() {
  const outputElement = document.getElementById('output');
  outputElement.innerHTML = ''; // Clear previous content

  // Use Promise.all to download all images in parallel
  Promise.all(imageUrls.map(downloadImage))
    .then((results) => {
      results.forEach(({ image, element }) => {
        const imgElement = document.createElement('img');
        imgElement.src = element.src;
        imgElement.alt = image.alt;
        outputElement.appendChild(imgElement);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

// Add click event listener to the button to start downloading and displaying images
const downloadButton = document.getElementById('download-images-button');
downloadButton.addEventListener('click', downloadAndDisplayImages);
