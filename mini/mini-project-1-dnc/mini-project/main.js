var baseUrl = "http://10.63.161.172:3000/api"
var size = 9; // pagesize
var totalProducts = 0; 
var currentPage = 0;
var body = {
  page: currentPage,
  data: {
    type: "service",
  }
}


// value debounce
var timer;
var cartItems = [];
/*
  {
    productId: number;
    productName: string;
    quanlity : number;
    price: number;
  }
*/
var currentListItem = [];

 
var listElement = document.getElementById("list-items");
var inputSearch = document.getElementById("search");
var detailContainer = document.getElementById("detail-container");
var detailItem = document.getElementById("detail-item");
var btnService = document.getElementById("btn-service")
var btnFacility = document.getElementById("btn-facilities")
var cart = document.getElementById("cart")
var cartDetailContainer = document.getElementById("cart-detail-container")
var cartDetail = document.getElementById("cart-detail")
var cartEmpty = document.getElementById("cart-empty");
var tableBody = document.getElementById("table-body")
var quantity = document.getElementById("quantity")
var sectionTotal = document.getElementById("section-total");
var totalPrice = document.getElementById('total-price')

var pagination = document.getElementById("pagination")
var paginationRender = document.getElementById("pagination-render")

var successContainer = document.getElementById("success-container")
var successItem = document.getElementById("success-item")




  /*
    body: {
      data: {
        type: string;
        name: string;
      },
      page: number;
    }
  */

const getProduct = async (body) => {
    try {
        const response = await fetch(`http://10.63.161.172:3000/api/get-product`, {
            method: "POST",
            body: JSON.stringify(body)
        })
        // return (await response.json()).data;
        const {items, total} = (await response.json()).data;
        return {items, total, check: true}
    } catch (error) {
        return {items: [], total : 0, check: false}
        
    }


}

const renderListProduct = async (body) => {
    const {items, total, check} = await getProduct({...body, size})
    // if(!check) return;
    currentListItem = items;
    totalProducts = total;
    const data = items.map(item => `
        <div onclick="viewDetail(this.id)" id="${item.id}" class="item">
            <img style="cursor: pointer" src="${item.image}" alt="">
            <div class="flex" style="justify-content: space-between;">
                <p>${item.name}</p>
                <p>${formatCurrency(item.price)}</p>
            </div>
        </div>`).join("")
    listElement.innerHTML = data;


    // render pagination
    if(!totalProducts) {
      pagination.classList.add("hidden")
      pagination.classList.remove("show")
    } else {
      pagination.classList.add("show")
      pagination.classList.remove("hidden")

      const totalPage = Math.ceil(totalProducts / size)

      const textPaginationData = [...Array(totalPage).keys()].map(e => `
        <span onclick="handleClickPaginationItem(${e})" class="item-pagination ${e == currentPage ? "item-pagination-active" : ""}">
          ${e + 1}
        </span>
      `).join("")
      
      paginationRender.innerHTML = textPaginationData;
    }
}

const renderCartItems = async () => {
  if(!cartItems.length) {
    cartDetail.classList.add('hidden');
    cartDetail.classList.remove('show');
    cartEmpty.classList.remove('hidden');
    cartEmpty.classList.add('show');
    quantity.innerHTML = "";
    return;
  }
  cartDetail.classList.remove('hidden');
  cartDetail.classList.add('show');
  cartEmpty.classList.add('hidden');
  cartEmpty.classList.remove('show');


  quantity.innerHTML = cartItems.reduce((res, curr) => res += curr.quanlity, 0);
  const total =  cartItems.reduce((res, curr) => res += curr.price * curr.quanlity, 0);
  const textData = cartItems.map(item => `<tr key=${item.productId}>
                              <th scope="row">
                                  ${item.name}
                              </th>
                              <td>
                                  ${item.quanlity}
                              </td>
                              <td>
                                  ${formatCurrency(item.quanlity * item.price)}
                              </td>
                              <td style="text-align: center;">
                                  <i id=${item.productId} onclick={handleRemoveItem(this.id)} style="cursor: pointer" class="fa-solid fa-trash"></i>
                              </td>
                          </tr>`).join("")
  
  tableBody.innerHTML = textData;
  if(total) {
    sectionTotal.classList.remove('hidden')
    totalPrice.innerHTML = `Total: ${formatCurrency(total)}`;
  } else {
    sectionTotal.classList.add('hidden')
  }

}

inputSearch.addEventListener('input', function (event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      body.data.name = event.target.value;
      renderListProduct(body)
    }, 500);
})

const viewDetail = (id) => {
    const item = currentListItem.find(x => x.id == id);
    const text = ` <img src=${item.image}>
                    <div class="flex" style="flex: 1; flex-direction: column;">
                      <div style="width: 100%; text-align: right">
                        <span onclick="closeShowDetail()" style="cursor: pointer; padding:10px">X</span>
                      </div> 
                      <div id="detail-content" style="display: flex; width:100%; flex: 1;flex-direction: column; justify-content: flex-start; align-items: flex-start; gap:10px;"
                        <p>Name: ${item.name}</p>
                        <p>Description: ${item.description}</p>
                        <p>Price: ${formatCurrency(item.price)}</p>
                      </div>
                      <div style="width: 100%; text-align: right">
                        <button id=${id} class="btn" onclick="handleAddToCart(this.id)">Add to cart</button>
                      </div>
                    </div>
            `;
    detailItem.innerHTML = text;
    detailContainer.classList.add('show-flex')
}

const clickOnDetail = (event) => {
    if(event.target.id == detailContainer.id) {
        detailContainer.classList.remove("show-flex");
        detailContainer.classList.add("hidden");
      return;
    }
}

const clickOnSuccess = (event) => {
    if(event.target.id == successContainer.id) {
        successContainer.classList.remove("show-flex");
        successContainer.classList.add("hidden");
      return;
    }
}



const closeShowDetail = () => {
  detailContainer.classList.remove("show-flex");
  detailContainer.classList.add("hidden");
}

const closeShowSucess = () => {
    successContainer.classList.remove("show-flex");
    successContainer.classList.add("hidden");
  }

const handleAddToCart = (productId) => {
  const index = cartItems.findIndex(item => item.productId == productId);
    if(index != -1) {
      cartItems[index].quanlity += 1;
    } else {
      const product = currentListItem.find(item => item.id == productId);
      cartItems.push({productId, quanlity: 1, name: product.name, price: product.price})
    }
    
    renderCartItems()  
}

const handleClickBtnType = (type) => {
  if(body.data.type == type) return;
  body.data.type = type;
  if(type == "service") {
    btnService.classList.add('active')
    btnFacility.classList.remove("active")
  } else {
    btnFacility.classList.add('active')
    btnService.classList.remove("active")
  }
  renderListProduct(body)
}

const showCart = () => {
  if(cartDetailContainer.classList.contains("show")) {
    cartDetailContainer.classList.remove("show");
    cartDetailContainer.classList.add("hidden")
  } else {
    cartDetailContainer.classList.add("show");
    cartDetailContainer.classList.remove("hidden")
  }
}


const handleClickCartDetailContainer = (event) => {
  if(event.target.id == cartDetailContainer.id) {
    cartDetailContainer.classList.remove("show");
    cartDetailContainer.classList.add("hidden");
    return;
  }
}

const handleRemoveItem = (productId) => {
  cartItems = cartItems.filter(item => item.productId != productId);
  renderCartItems();
}

const submitCart = async () => {
  try {
    const response = await fetch("http://10.63.161.172:3000/api/insert-order", {
        method: "POST",
        body: JSON.stringify({items: [{products : [...cartItems]}]})
    })    
    const data = await response.json();
    console.log("data :", data.items)

    const text = ` 
    <div class="flex" style="flex: 1; flex-direction: column;">
      <div style="width: 100%; text-align: right">
        <span onclick="closeShowSucess()" style="cursor: pointer; padding:10px">X</span>
      </div> 
      <div id="detail-content" style="display: flex; width:100%; flex: 1;flex-direction: column; justify-content: center; align-items: center; gap:10px;"
        <p>Create order successfully</p>
        <p>Check order detail <a style="color:#38c6f4" href='/view-detail.html?orderId=${data.items[0].orderId}'>here</a> </p>
      </div>
    </div>
`;
    successItem.innerHTML = text;
    successContainer.classList.add('show-flex') 
    cartItems = [];
    cartDetailContainer.classList.remove("show");
    cartDetailContainer.classList.add("hidden")
  } catch (error) {
    alert("Fail")
  }
}

const handleClickPaginationItem = (pageSelected) => {
  currentPage = pageSelected;
  body = {...body, page: currentPage}
  renderListProduct(body)
}

const handlePrePage = () => {
  if(currentPage == 0) return;
  handleClickPaginationItem(currentPage - 1)
}

const handleNextPage = () => {
  if(currentPage == Math.ceil(totalProducts / size)) return;
  handleClickPaginationItem(currentPage + 1)
}


const formatCurrency = (val) => {
  return val.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}

// initial
renderListProduct(body);
renderCartItems()