import cart from "./cart.json";
import currencyRates from "./currencyRates.json";

import { renderTotals, renderItems } from "./view";

let currencyPicker = document.querySelector("select[name='currency-picker']");

currencyPicker.innerHTML = Object.keys(currencyRates)
  .map((key) => {
    return `<option>${key}</option>`;
  })
  .join("");

const currencyConverter = (currency, rates, fn) => {
  const currencyRates = rates[currency];
  return (cart) => {
    const revised = cart.map((item) => {
      return {
        ...item,
        const: item.cost * currencyRates,
      };
    });
  };
};

const computeCart = (cart) => {
  renderTotals(cart);
  renderItems(cart);
};

computeCart(cart);
