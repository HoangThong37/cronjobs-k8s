var pagination = document.getElementById("pagination");
let totalItems = 0;
let pageCount = 0;
// let paginationLimit = 100;
let listItems = 0;

var pagesize = 9;
var currentType = "service";

var body = {
  page: 0,
  size: 15,
  data: {
    type: currentType,
  },
};

var paginationNumbers = document.getElementById("pagination-numbers");
var listImageElement = document.getElementById("list-image");

// start cart
let cart = [];
// const listImageElement = document.getElementById("list-image");
const quantityElement = document.getElementById("quantity");
const cartTableBody = document.querySelector("#cart-table tbody");
const totalPriceElement = document.getElementById("total-price");
let currentProduct = null;

//
var cartDetailContainer = document.getElementById("cart-popup");
var successContainer = document.getElementById("success-container");
var successItem = document.getElementById("success-item");

var cartPopup = document.getElementById("cart-popup");
// var popUp = document.getElementById("popup");

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
// End cart.

const getData = async (page = 0) => {
  const response = await fetch("http://10.63.161.172:3000/api/get-product");

  const jsonData = await response.json();

  const filteredData = jsonData.data.items.filter(
    (item) => item.type === body.data.type
  );

  console.log("filteredData ", filteredData);

  const paginatedData = filteredData.slice(
    page * pagesize,
    (page + 1) * pagesize
  );

  console.log("filteredData.length : ", filteredData.length);

  return {
    items: paginatedData,
    total: filteredData.length,
  };
};

const renderView = async (page = 0) => {
  const data = await getData(page);
  listImageElement.innerHTML = data.items
    .map(
      (item) => `
    <div class="item" style="border: 1px solid black;" onclick="showPopup(${JSON.stringify(
      item
    ).replace(/"/g, "&quot;")})">
    ${createProductHTML(item)}
    </div>
  `
    )
    .join("");

  const totalPage = Math.ceil(data.total / pagesize);
  console.log(totalPage);

  paginationNumbers.innerHTML = [...Array(totalPage).keys()]
    .map((x) => `<div class="page-number" data-page="${x}">${x + 1}</div>`)
    .join("");

  const pageNumbers = document.querySelectorAll(".page-number");
  // console.log("pageNumbers : ", pageNumbers);

  pageNumbers.forEach((pageNumber) => {
    pageNumber.addEventListener("click", () => {
      const page = parseInt(pageNumber.dataset.page);
      renderView(page);
    });
  });
};

// show html
function createProductHTML(item) {
  return `
      <img src="${item.image}" style="width: 100%;">
      <h4 style="padding-left: 5px;">${item.name}</h4>
      <p style="padding-left: 5px;">Price: ${item.price.toLocaleString()} VND</p>
    `;
}

// show popup when clicked on img
function showPopup(item) {
  currentProduct = item;
  console.log("currentProduct", currentProduct);
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
  renderView(0); // Reset về trang đầu tiên khi lọc
};

// Khởi tạo sự kiện click cho các nút
const getProductType = () => {
  const buttonsElement = document.getElementsByClassName("product-type__btn");

  for (let i = 0; i < buttonsElement.length; i++) {
    const button = buttonsElement[i];

    button.onclick = function () {
      if (button.classList.contains("active")) {
        return;
      }

      for (let j = 0; j < buttonsElement.length; j++) {
        buttonsElement[j].classList.remove("active");
      }

      button.classList.add("active");
      filterData(button.value);
    };
  }
};

renderView();
getProductType();

//  start: search data image
let searchTimeout;

function handleSearch(searchValue) {
  clearTimeout(searchTimeout); // delete timeout  // if ese

  searchTimeout = setTimeout(() => {
    searchData(searchValue);
  }, 300);
}

async function searchData(searchValue) {
  const response = await fetch("http://10.63.161.172:3000/api/get-product");
  const jsonData = await response.json();

  const data = jsonData.data && jsonData.data.items ? jsonData.data.items : [];

  const filteredData = data.filter((item) => {
    return item.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  renderSearchResults(filteredData);
}

function renderSearchResults(data) {
  const searchResultsElement = document.getElementById("list-image");
  searchResultsElement.innerHTML = "";

  data.forEach((item) => {
    const resultItem = document.createElement("div");

    resultItem.className = "item";
    resultItem.style.border = "1px solid black";
    resultItem.onclick = () => showPopup(item);

    resultItem.innerHTML = createProductHTML(item);
    searchResultsElement.appendChild(resultItem);
  });
}
// end: search data image

// start: submit order
// const cartItems = [];
const submitOrder = async () => {
  try {
    const callApi = await fetch("http://10.63.161.172:3000/api/get-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: [{ products: [...cart] }] }),
    });

    const response = await callApi.json();
    //console.log("callApi :", callApi);
    //console.log("response :", response);

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

    console.log("showText :", showText);
    successItem.innerHTML = showText;

    successContainer.classList.add("show-flex");

    cart = [];
    quantityElement.textContent = 0;
    console.log("cart test:", cart);

    // console.log("showText3 :", cart);
    // console.log("cartDetailContainer: ", cartDetailContainer);

    cartDetailContainer.classList.remove("show");
    cartDetailContainer.classList.add("hidden");
  } catch (error) {
    alert("Fail fail");
  }
};

const closeShowSucess = () => {
  successContainer.classList.remove("show-flex");
  successContainer.classList.add("hidden");
};

//<p>Check order detail <a style="color:#38c6f4" href='/view-detail.html?orderId=${data.items[0].orderId}'>here</a> </p>

// var notification = document.getElementById("success-noti");
// notification.style.display = "block";

// var link = document.getElementById("order-detail-link");
// link.href = "order.html";
//}
// end: submit order
