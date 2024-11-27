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
  // console.log(this.value)/
  const conversionRates = rates[currency] ??  1;
  return (cart) => {
    const revised = cart?.map((item) => {
      return {
        ...item,
        cost: item.cost * conversionRates,
      };
    });
    return fn(revised);
  };
};

const computeCart = function() {
const currency =  this?.value;
  currencyConverter(currency, currencyRates, renderItems)(cart);
  currencyConverter(currency, currencyRates, renderTotals)(cart);
  // renderTotals(cart);
  // renderItems(cart);
};


currencyPicker.addEventListener("change", computeCart);
computeCart();
