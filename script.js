const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");
const amount = document.getElementById("amount");
const dateofrate = document.getElementById("dateofrate");
const API_KEY = "e95f39d75d7839e1bf654032";
let country = {};

///country code
async function api_call(from = "INR") {
  await fetch(
    `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`,
  )
    .then((response) => response.json())
    .then((data) => {
      let unixTime = data.time_last_update_unix;
      let date = new Date(unixTime * 1000);
      let readable = date.toDateString();
      dateofrate.innerText = readable;

      country = data.conversion_rates;
      let countrycode = Object.keys(country);
      countrycode.forEach((key) => {
        let op = document.createElement("option");
        op.value = key;
        op.textContent = key;
        fromCurrency.appendChild(op);
        toCurrency.appendChild(op.cloneNode(true));
      });
    }).catch(err => console.error(err));;
}

window.addEventListener("DOMContentLoaded", () => {
  api_call();
});
async function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  await api_call(from);
  const r = country[to];

  if (amount.value == 0) {
    result.innerHTML = "First Enter Amount";
  } else {
    result.innerHTML = (r * amount.value).toFixed(2);
  }
}

function flagupdate(Currency, flagimg) {
  let code = Currency.value.split(" ");
  let code1 = code[0].split("");
  code1.pop();
  let code2 = code1.join("");
  console.log(code2);
  document.getElementById(`${flagimg}`).src =
    `https://flagsapi.com/${code2}/flat/64.png`;
}

fromCurrency.addEventListener("change", () => {
  flagupdate(fromCurrency, "flagimg1");
});

toCurrency.addEventListener("change", () => {
  flagupdate(toCurrency, "flagimg2");
});
