const getDataApi = async () => {
  const response = await fetch('https://api.exchangerate.host/latest');
  const data = await response.json();
  return data;
};

getDataApi()
  .then((data) => {
    const select = document.querySelectorAll('#select-value');
    select.forEach((element) => {
      const keyArrayOption = Object.keys(data.rates);
      const filterKeyArrayOption = keyArrayOption.filter((el) => el !== 'RUB' && el !== 'USD' && el !== 'EUR' && el !== 'GBP');
      for (let i = 0; i < filterKeyArrayOption.length; i += 1) {
        const optionCreate = document.createElement('option');
        element.append(optionCreate);
        optionCreate.innerText = filterKeyArrayOption[i];
      }
    });
  });

  
