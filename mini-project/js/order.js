document.addEventListener("DOMContentLoaded", function () {
  var orderData = JSON.parse(localStorage.getItem("item"));
  console.log(orderData);

  if (Object.values(orderData)) {
    var orderDetails = document.getElementById("order-details");
    var totalPriceElement = document.getElementById("total-price");
    var totalPrice = 0;

    Object.values(orderData).forEach(function (item) {
      console.log("item", item);

      var row = document.createElement("tr");
      row.innerHTML = `
              <td>${item.name}</td>
              <td>${item.type}</td>
              <td>${item.quantity}</td>
              <td>${item.price} VND</td>
          `;

      console.log("row ", row);
      orderDetails.appendChild(row);

      totalPrice += item.price * item.quantity;
      console.log("totalPrice ", totalPrice);
    });

    totalPriceElement.textContent = `${totalPrice.toLocaleString()} VND`;
  } else {
    console.error("Invalid data in localStorage");
  }
});
