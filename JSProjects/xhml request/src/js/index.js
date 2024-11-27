// Write your code here...
import Http from './http';
const container = document.querySelector('.list');
const total = document.querySelector('.total');
const addProductForm = document.querySelector('form[name=add-product]');
const http = new Http('http://localhost:3000/products');

const Row = ({ product, price, id }) =>
  `<div class="product">
    <span class="prod-name">${product}</span>
    <span class="prod-cost">$${price}</span>
    <div class="delete-btn"><a href="#" name="delete-btn" data-id="${id}">X</a></div>
  </div>`;

const render = function (arr) {
  const elems = arr.map((e) => Row(e));
  const totalCost = arr?.reduce((prev, curr) => prev + Number(curr.price), 0);

  container.innerHTML = elems.join('');
  total.innerHTML = Row({ product: 'TOTAL', price: totalCost });
};

async function loadAndRender() {
  try {
    const { status, response } = await http.get();
    console.log("26",status, response);
    // render(JSON.parse(response));
  } catch {
    alert('There was an error talking to the server!');
  }
}

loadAndRender();

// Add product and reload
//  