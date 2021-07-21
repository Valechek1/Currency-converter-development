const buttonsLeft = document.querySelectorAll('.btn-left-money');
const buttonsRight = document.querySelectorAll('.btn-right-money');

const selectLeft = document.querySelector('.select-left-money');
const selectRight = document.querySelector('.select-right-money');

const imgReverseArrow = document.querySelector('#arrow-img');

const selects = document.querySelectorAll('#select-value');
let btnValueLeft = 'RUB';
let btnValueRight = 'USD';

const getSupportedSymbols = async () => {
  const response = await fetch('https://api.exchangerate.host/symbols');
  const data = await response.json();
  return Object.keys(data.symbols);
};

const getCurrencyPair = async (currencyOne, currencyTwo) => {
  const response = await fetch(`https://api.exchangerate.host/latest?base=${currencyOne}&symbols=${currencyTwo}`);
  const data = await response.json();
  const rate = data.rates[currencyTwo];

  const responseRewerse = await fetch(`https://api.exchangerate.host/latest?base=${currencyTwo}&symbols=${currencyOne}`);
  const dataRewerse = await responseRewerse.json();
  const rateReverse = dataRewerse.rates[currencyOne];

  return [rate, rateReverse];
};

// getCurrencyPairRevers('RUB', 'USD');
// getCurrencyPair('RUB', 'EUR');
// getCurrencyPair('RUB', 'GBP');

getSupportedSymbols()
  .then((symbols) => {
    selects.forEach((select) => {
      const filterSymbols = symbols.filter((el) => el !== 'RUB' && el !== 'USD' && el !== 'EUR' && el !== 'GBP');
      for (let i = 0; i < filterSymbols.length; i += 1) {
        const optionCreate = document.createElement('option');
        optionCreate.innerText = filterSymbols[i];
        optionCreate.value = filterSymbols[i];

        select.append(optionCreate);
      }
    });
  });

buttonsLeft.forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.style.backgroundColor = '#833AE0';
    btn.style.color = '#FFFFFF';
    btnValueLeft = btn.innerText;
    algoritmMeaningRightInput();
  });
});

buttonsRight.forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.style.backgroundColor = '#833AE0';
    btn.style.color = '#FFFFFF';
    btnValueRight = btn.innerText;
    algoritmMeaningRightInput();
  });
});

selectLeft.addEventListener('change', (event) => {
  btnValueLeft = event.target.value;
  algoritmMeaningRightInput();
});

selectRight.addEventListener('change', (event) => {
  btnValueRight = event.target.value;
  algoritmMeaningRightInput();
});

imgReverseArrow.addEventListener('click', () => {
  const resultLeft = btnValueLeft;
  btnValueLeft = btnValueRight;
  btnValueRight = resultLeft;
  algoritmMeaningRightInput();
});

function algoritmMeaningRightInput() {
  // const leftActiveButton = document.querySelector(`#btn-left-${btnValueLeft}`);
  // const rightActiveButton = document.querySelector(`#btn-right-${btnValueRight}`);

  // leftActiveButton.style.backgroundColor = '#833AE0';
  // leftActiveButton.style.color = '#FFFFFF';

  // rightActiveButton.style.backgroundColor = '#833AE0';
  // rightActiveButton.style.color = '#FFFFFF';

  getCurrencyPair(btnValueLeft, btnValueRight)
    .then((rates) => {
      console.log(rates);
      const inputLeft = document.querySelector('#input-left');
      const inputRight = document.querySelector('#input-right');
      inputRight.value = rates[0] * inputLeft.value;
    });
}

algoritmMeaningRightInput();
