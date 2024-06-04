

var tableBody = document.getElementById("table-body")

var total = document.getElementById("total-price")


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
}

const renderOrderDetail = async () => {
    var orderId = getQueryVariable("orderId");
    const response = await fetch("http://10.63.161.172:3000/api/get-order", {
        method: "POST",
        body: JSON.stringify({
            "page": 0,
            "size": 2,
            "data":{
                "orderId": orderId
            }})
    })
    const {items} = (await response.json()).data;

    const total =  items[0].products.reduce((res, curr) => res += curr.price * curr.quanlity, 0);
    console.log("total :", total)
    const textData = items[0].products.map(item => `<tr key=${item.productId}>
                                <th scope="row">
                                    ${item.name}
                                </th>
                                <td>
                                    ${item.quanlity}
                                </td>
                                <td>
                                    ${(item.quanlity * item.price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                                </td>
                            </tr>`).join("")

    tableBody.innerHTML = textData;
    total.innerHTML = `total : ${total}`; 

}

renderOrderDetail();