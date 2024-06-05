var urlGetData = "http://10.63.161.172:3000/api/get-product";
var urlOrder = "http://10.63.161.172:3000/api/get-order";

var totalItems = [];
var listImageCurrent = [];
var cart = [];

var timer = 0;
var pageCount = 0;
var listItems = 0;
var currentPage = 0;
var size = 9;

var body = {
  page: currentPage,
  data: {
    type: "service",
  },
};

var currentProduct = null;
var pagination = document.getElementById("pagination");
var paginationNumbers = document.getElementById("pagination-numbers");
var listImageElement = document.getElementById("list-image");
var quantityElement = document.getElementById("quantity");
var cartTableBody = document.querySelector("#cart-table tbody");
var totalPriceElement = document.getElementById("total-price");
var cartDetailContainer = document.getElementById("cart-popup");
var successContainer = document.getElementById("success-container");
var successItem = document.getElementById("success-item");
var cartPopup = document.getElementById("cart-popup");

var searchInput = document.getElementById("search");
var btnService = document.getElementById("button_service");
var btnFacility = document.getElementById("button_facilities");

function addToCart() {
  if (currentProduct) {
    const productId = currentProduct.id;
    if (cart[productId]) {
      cart[productId].quantity++;
    } else {
      cart[productId] = { ...currentProduct, quantity: 1 };
    }
    console.log("cart", cart.length);

    quantityElement.textContent = Object.keys(cart).length;
    closePopup();
  }
}

function showCartPopup() {
  // cartPopup.style.display = "block";
  cartPopup.classList.remove("hidden");
  cartPopup.classList.add("show");
  renderCartTable();
}

function removeFromCart(index) {
  if (cart[index]) {
    cart[index].quantity--;
    if (cart[index].quantity === 0) {
      delete cart[index];
    }

    quantityElement.textContent = cart.length;
    renderCartTable();
  }
}

function renderCartTable() {
  cartTableBody.innerHTML = "";

  let totalPrice = 0;

  for (const key in cart) {
    if (cart.hasOwnProperty(key)) {
      const item = cart[key];

      const row = document.createElement("tr");
      const nameCell = document.createElement("td"); // name
      const priceCell = document.createElement("td"); // price
      const quantityCell = document.createElement("td"); // quantity

      const actionCell = document.createElement("td");
      const deleteButton = document.createElement("button"); // delete

      nameCell.textContent = item.name;
      row.appendChild(nameCell);

      priceCell.textContent = `${(
        item.price * item.quantity
      ).toLocaleString()} VND`;
      row.appendChild(priceCell);

      quantityCell.textContent = item.quantity;
      row.appendChild(quantityCell);

      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => removeFromCart(key);
      actionCell.appendChild(deleteButton);
      row.appendChild(actionCell);

      cartTableBody.appendChild(row);

      totalPrice += item.price * item.quantity; //update price
    }
  }

  totalPriceElement.textContent = `${totalPrice.toLocaleString()} VND`;
}

function closeCartPopup() {
  cartPopup.classList.add("hidden");
  cartPopup.classList.remove("show");
}

// handle request fail.
async function fetchRetry(url, options) {
  let startRetries = 0;
  let maxRetries = 5;
  let retryDelay = 1000;

  while (startRetries < maxRetries) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return (await response.json()).data;
      } else {
        throw new Error(
          `API request failed with status code ${response.status}`
        );
      }
    } catch (error) {
      console.error(`Error fetching data from API: ${error.message}`);
      startRetries++;

      if (startRetries === maxRetries) {
        throw error;
      } else {
        console.log(`Retrying API request (${startRetries} of ${maxRetries})`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }
  }
}

// get data.
const getData = async (body) => {
  try {
    const { items, total } = await fetchRetry(urlGetData, {
      method: "POST",
      body: JSON.stringify(body),
    });

    return { items, total, status: true };
  } catch (error) {
    return { items: [], total: 0, status: false };
  }
};

const renderView = async (body) => {
  const { items, total, status } = await getData({ ...body, size }); // spread (...)

  listImageCurrent = items;
  console.log(listImageCurrent);

  totalItems = total;

  listImageElement.innerHTML = items
    .map(
      (item) => `
       <div class="item" style="border: 1px solid black;" onclick="showPopup(${JSON.stringify(
         item
       ).replace(/"/g, "&quot;")})">
        ${showProducs(item)}
        </div>
    `
    )
    .join("");

  const totalPage = Math.ceil(totalItems / size); // 50/9

  paginationNumbers.innerHTML = [...Array(totalPage).keys()]
    .map(
      (x) => `<div onclick="handlePage(${x})" data-page="${x}">${x + 1}</div>`
    )
    .join("");
};

const handlePage = (pageClick) => {
  currentPage = pageClick;
  renderView({ ...body, page: currentPage }); // set new body when click page.
};

const prePage = () => {
  if (currentPage == 0) return;
  handlePage(currentPage - 1);
};

const nextPage = () => {
  if (currentPage == Math.ceil(totalItems / size)) return;
  handlePage(currentPage + 1);
};

// show products.
function showProducs(item) {
  return `
      <img src="${item.image}" style="width: 100%;">
      <h4 style="padding-left: 5px;">${item.name}</h4>
      <p style="padding-left: 5px;">Price: ${item.price.toLocaleString()} VND</p>
    `;
}

// show popup when clicked on img
function showPopup(item) {
  currentProduct = item;

  const popup = document.getElementById("popup");
  const popupImage = popup.querySelector(".popup-image");
  const popupName = popup.querySelector(".popup-name");
  const popupDescription = popup.querySelector(".popup-description");
  const popupPrice = popup.querySelector(".popup-price");

  popupImage.src = item.image;
  popupName.textContent = item.name;
  popupDescription.textContent = item.description;
  popupPrice.textContent = `${item.price.toLocaleString()} VND`;

  popup.style.display = "block";
}

// close the popup
function closePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}

// filter data and update when click button.
const filterData = (productType) => {
  body.data.type = productType;
  renderView(body);
};

const handleClickBtn = (typeBtn) => {
  if (body.data.type == typeBtn) return;

  body.data.type = typeBtn;

  switch (typeBtn) {
    case "service":
      btnService.classList.add("active");
      btnFacility.classList.remove("active");
      break;
    case "facility":
      btnFacility.classList.add("active");
      btnService.classList.remove("active");
      break;
    default:
      break;
  }

  renderView(body);
};

//search
// const getProductType = () => {
//   const buttonsElement = document.getElementsByClassName("product-type__btn");

//   for (let i = 0; i < buttonsElement.length; i++) {
//     const button = buttonsElement[i];

//     button.onclick = function () {
//       if (button.classList.contains("active")) {
//         return;
//       }

//       for (let j = 0; j < buttonsElement.length; j++) {
//         buttonsElement[j].classList.remove("active");
//       }

//       button.classList.add("active");
//       filterData(button.value);
//     };
//   }
// };

// search data

// search data.
searchInput.addEventListener("input", function (event) {
  if (timer) clearTimeout(timer);

  timer = setTimeout(() => {
    body.data.name = event.target.value;
    renderView(body);
  }, 300);
});

const closeShowSucess = () => {
  successContainer.classList.remove("show-flex");
  successContainer.classList.add("hidden");
};

// submit order
const submitOrder = async () => {
  try {
    const callApi = await fetch(urlOrder, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: [{ products: [...cart] }] }),
    });

    const response = await callApi.json();

    const showText = ` 
    <div class="flex" style="flex: 1; flex-direction: column;">
      <div style="width: 100%; text-align: right">
        <span onclick="closeShowSucess()" style="cursor: pointer; padding:10px">X</span>
      </div> 
      <div id="detail-content" style="display: flex; width:100%; flex: 1;flex-direction: column; justify-content: center; align-items: center; gap:10px;"
        <p>Create order successfully</p>
        
      </div>
    </div>
  `;

    successItem.innerHTML = showText;

    successContainer.classList.add("show-flex");

    cart = [];
    quantityElement.textContent = 0;

    cartDetailContainer.classList.remove("show");
    cartDetailContainer.classList.add("hidden");
  } catch (error) {
    // alert("Fail fail");
  }
};

renderView(body);
