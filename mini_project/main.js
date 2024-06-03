// var pagination = document.getElementById("pagination");
// let totalItems = 0;
// let pageCount = 0;
// let paginationLimit = 10;
// let listItems = 0;

// var pagesize = 9;

// var body = {
//   page: 0,
//   data: {
//     type: "facility",
//   },
// };

// var paginationNumbers = document.getElementById("pagination-numbers");
// var listImageElement = document.getElementById("myButton");

// const getData = async () => {
//   const response = await fetch("http://10.63.161.172:3000/api/get-product", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   });

//   const data = await response.json();
//   return data.data;
// };

// // window.addEventListener("load", () => {
// const renderView = async () => {
//   const data = await getData();
//   // render image

//   listImageElement.innerHTML = data.items
//     .map(
//       (item) => `
//     <div class="item" styl(e="border: 1px solid black;">
//       <img src="${item.image}" style="width: 100%;">
//       <h4 style="padding-left: 5px;">${item.name}</h4>
//       <p style="padding-left: 5px;">Price: ${item.price.toLocaleString()} VND</p>
//     </div>
//   `
//     )
//     .join("");

//   // render page
//   const totalPage = Math.ceil(data.total / pagesize);
//   console.log("totalPage:", [...Array(totalPage).keys()]);

//   paginationNumbers.innerHTML = [...Array(totalPage).keys()]
//     .map((x) => `<div>${x}</div>`)
//     .join("");
// };

// renderView();

var pagination = document.getElementById("pagination");
let totalItems = 0;
let pageCount = 0;
let paginationLimit = 10;
let listItems = 0;

var pagesize = 9;

var body = {
  page: 0,
  data: {
    type: "facility",
  },
};

var paginationNumbers = document.getElementById("pagination-numbers");
var listImageElement = document.getElementById("list-image");

const getData = async (page = 0) => {
  const response = await fetch("http://10.63.161.172:3000/api/get-product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...body, page }),
  });

  const data = await response.json();
  return data.data;
};

const renderView = async (page = 0) => {
  const data = await getData(page);
  console.log(data.items);
  listImageElement.innerHTML = data.items
    .map(
      (item) => `
    <div class="item" style="border: 1px solid black;">
      <img src="${item.image}" style="width: 100%;">
      <h4 style="padding-left: 5px;">${item.name}</h4>
      <p style="padding-left: 5px;">Price: ${item.price.toLocaleString()} VND</p>
    </div>
  `
    )
    .join("");

  // console.log(" listImageElement : ", listImageElement);

  const totalPage = Math.ceil(data.total / pagesize);
  paginationNumbers.innerHTML = [...Array(totalPage).keys()]
    .map((x) => `<div class="page-number" data-page="${x}">${x + 1}</div>`)
    .join("");

  const pageNumbers = document.querySelectorAll(".page-number");
  console.log("pageNumbers :", pageNumbers);
  pageNumbers.forEach((pageNumber) => {
    pageNumber.addEventListener("click", () => {
      const page = parseInt(pageNumber.dataset.page);
      renderView(page);
    });
  });
};

renderView();

// detail img
// const jsonDataUrl = "";

// // Fetch the JSON data and generate image elements
// fetch("http://10.63.161.172:3000/api/get-product")
//   .then((response) => response.json())
//   .then((data) => {
//     const items = data.data.items;
//     console.log("items", items);

//     const imageContainer = document.getElementById("list-image");

//     items.forEach((item) => {
//       const imgElement = document.createElement("img");
//       imgElement.src = item.image;
//       imgElement.alt = item.name;
//       imgElement.className = "image";
//       imgElement.onclick = () => showPopup(item);

//       imageContainer.appendChild(imgElement);
//     });
//   })
//   .catch((error) => console.error("Error fetching JSON data:", error));

// // Function to show the popup with the clicked image details
// function showPopup(item) {
//   const popup = document.getElementById("popup");
//   const popupImage = popup.querySelector(".popup-image");
//   const popupName = popup.querySelector(".popup-name");
//   const popupDescription = popup.querySelector(".popup-description");
//   const popupPrice = popup.querySelector(".popup-price");

//   popupImage.src = item.image;
//   popupName.textContent = item.name;
//   popupDescription.textContent = item.description;
//   popupPrice.textContent = `$${item.price}`;

//   popup.style.display = "block";
// }

// // Function to close the popup
// function closePopup() {
//   const popup = document.getElementById("popup");
//   popup.style.display = "none";
// }

//

// var cartDetailContainer = document.getElementById("cart-detail-container");
// const handleClickCartDetailContainer = (event) => {
//   if (event.target.id == cartDetailContainer.id) {
//     cartDetailContainer.classList.remove("show");
//     cartDetailContainer.classList.add("hidden");
//     return;
//   }
// };
