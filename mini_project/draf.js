// fetch("http://10.63.161.172:3000/api/get-product")
//   .then((response) => response.json())
//   .then((data) => {
//     const imageContainer = document.getElementById("list-image");
//     imageContainer.innerHTML = "";

//     if (data && data.data && data.data.items) {
//       data.data.items.forEach((item) => {
//         if (item && item.image) {
//           const imageElement = document.createElement("img");
//           imageElement.src = item.image;
//           imageElement.alt = item.name;

//           console.log(imageElement);
//           imageContainer.appendChild(imageElement);
//         }
//       });
//     } else {
//       console.error("Error fetching data:", data);
//     }
//   });
