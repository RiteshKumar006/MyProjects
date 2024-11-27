// import Row from "./row.js";

const totalQuantity =  document.querySelector('.total-quantity');
const totalcost =  document.querySelector('.total-cost');
const itemRows = document.querySelector('.item-rows');

export const renderTotals = (carts=[]) => {
  const cart = carts?.reduce((acc, curr) => {
    return acc + curr.cost * curr.quantity;
  }, 0);
  const quantity = carts?.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);
  totalQuantity.textContent = quantity;
  totalcost.textContent = cart;
};


export const renderItems = (rows) => {
 const domNodes = rows?.map(({product, quantity, cost}) => {
   return `<div class="cart-row">
              <div class="item">${product}</div>
              <div class="quantity">${quantity}</div>
              <div class="cost">${cost.toPrecision(6)}</div>
            </div>`
 })

 itemRows.innerHTML = domNodes.join('');
}