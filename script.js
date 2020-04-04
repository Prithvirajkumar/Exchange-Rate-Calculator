const currencyOne = document.getElementById('currency-one');
const amountOne = document.getElementById('amount-one');
const currencyTwo = document.getElementById('currency-two');
const amountTwo = document.getElementById('amount-two');
const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

// Event listeners 
currencyOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
currencyTwo.addEventListener('change', calculate);
amountTwo.addEventListener('input', calculate);
swap.addEventListener('click', () => {
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    calculate();
})

// Fetch exhange rate and update the DOM
function calculate() {
    const currencyOneValue = currencyOne.value;
    const currencyTwoValue = currencyTwo.value;

    fetch(`https://prime.exchangerate-api.com/v5/08d950cd8753931a77a7bc39/latest/${currencyOneValue}`)
    .then(res => res.json())
    .then(data => {
        const rateData = data.conversion_rates[currencyTwoValue];
        rate.innerText = `1 ${currencyOneValue} = ${rateData} ${currencyTwoValue}`;
        amountTwo.value = (amountOne.value * rateData).toFixed(2);
    });
}

calculate();