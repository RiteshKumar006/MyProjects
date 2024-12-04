const openRates = async (base, symbol) => {
  try {
    if (base === 'EUR' && symbol === 'EUR') {
      return {
        rate: 1,
      };
    } else {
      // https://data.fixer.io/api/latest?access_key=78e0b148d8d0bc8643fba5eddc55c174&format=1
      const url = `https://data.fixer.io/api/latest`;
      const params = new URLSearchParams({
        access_key: "78e0b148d8d0bc8643fba5eddc55c174",  // Replace with your API key
        base: "INR",
        symbols : "USD,AUD,CAD,PLN,MXN"
      });
      const fetchRates = await fetch(`${url}?${params}`);
      const jsonData = await fetchRates.json();

      return Promise.resolve({
        rate: jsonData.rates[symbol],
      });
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default openRates;
