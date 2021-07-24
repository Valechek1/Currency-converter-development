const buttonsLeft = document.querySelectorAll('.btn-left-money');
const buttonsRight = document.querySelectorAll('.btn-right-money');

const selectLeft = document.querySelector('.select-left-money');
const selectRight = document.querySelector('.select-right-money');

const imgReverseArrow = document.querySelector('#arrow-img');

const selects = document.querySelectorAll('#select-value');

let btnValueLeft = 'RUB';
let btnValueRight = 'USD';
let loaderTimer = null;

const ratese = [];
const ratesReverse = [];

const inputLeft = document.querySelector('#input-left');
const inputRight = document.querySelector('#input-right');

const paragrafLeft = document.querySelector('.text-about-converter-left');
const paragrafRight = document.querySelector('.text-about-converter-right');

const showLoader = () => {
  loaderTimer = setTimeout(() => {
    document.querySelector('.overlay').classList.remove('hidden');
    loaderTimer = null;
  }, 500);
};

const hideLoader = () => {
  if (loaderTimer !== null) {
    clearTimeout(loaderTimer);
    loaderTimer = null;
  }
  document.querySelector('.overlay').classList.add('hidden');
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

function mathematicalFunctionCalculation() {
  const leftActiveButton = document.querySelector(`#btn-left-${btnValueLeft}`);
  const rightActiveButton = document.querySelector(`#btn-right-${btnValueRight}`);
  const deliteLeftActivClass = document.querySelector('.left-box .activ');

  if (deliteLeftActivClass) {
    deliteLeftActivClass.classList.remove('activ');
  }

  if (leftActiveButton) {
    leftActiveButton.classList.add('activ');
  } else {
    selectLeft.classList.add('activ');
  }

  const deliteRightActivClass = document.querySelector('.right-box .activ');
  if (deliteRightActivClass) {
    deliteRightActivClass.classList.remove('activ');
  }

  if (rightActiveButton) {
    rightActiveButton.classList.add('activ');
  } else {
    selectRight.classList.add('activ');
  }

  showLoader();
  getCurrencyPair(btnValueLeft, btnValueRight)
    .then((rates) => {
      ratese.push(rates[0], rates[1]);

      ratesReverse.push(rates[1], rates[0]);

      inputRight.value = rates[0] * inputLeft.value;

      paragrafLeft.innerText = `1 ${btnValueLeft} = ${rates[0]} ${btnValueRight}`;

      paragrafRight.innerText = `1 ${btnValueRight} = ${rates[1]} ${btnValueLeft}`;

      hideLoader();
    });
}

const getSupportedSymbols = async () => {
  const response = await fetch('https://api.exchangerate.host/symbols');
  const data = await response.json();
  return Object.keys(data.symbols);
};

buttonsLeft.forEach((btn) => {
  btn.addEventListener('click', () => {
    btnValueLeft = btn.innerText;
    mathematicalFunctionCalculation();
  });
});

buttonsRight.forEach((btn) => {
  btn.addEventListener('click', () => {
    btnValueRight = btn.innerText;
    mathematicalFunctionCalculation();
  });
});

selectLeft.addEventListener('change', (event) => {
  btnValueLeft = event.target.value;
  mathematicalFunctionCalculation();
});

selectRight.addEventListener('change', (event) => {
  btnValueRight = event.target.value;
  mathematicalFunctionCalculation();
});

imgReverseArrow.addEventListener('click', () => {
  const resultLeft = btnValueLeft;
  btnValueLeft = btnValueRight;
  btnValueRight = resultLeft;
  mathematicalFunctionCalculation();
});

const performCalculations = () => {
  const resultInputValue = inputLeft.value;
  inputRight.value = ratese[0] * resultInputValue;
};

const performCalculationsRight = () => {
  const resultInputValueRight = inputRight.value;
  inputLeft.value = ratesReverse[1] * resultInputValueRight;
};

inputLeft.addEventListener('keyup', () => {
  performCalculations();
});

inputRight.addEventListener('keyup', () => {
  performCalculationsRight();
});

const startApp = () => {
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
  mathematicalFunctionCalculation();
};

startApp();
