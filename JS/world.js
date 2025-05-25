const searchBtn = document.getElementById('searchBtn');
const countryInput = document.getElementById('countryInput');
const countryResult = document.getElementById('countryResult');

searchBtn.addEventListener('click', () => {
  const countryName = countryInput.value.trim();
  if (countryName) {
    fetchCountryData(countryName);
  } else {
    countryResult.innerHTML = `<p>Please enter a country name.</p>`;
  }
});

async function fetchCountryData(name) {
  countryResult.innerHTML = `<p>Loading...</p>`;
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    if (!response.ok) throw new Error("Country not found");
    
    const data = await response.json();
    const country = data[0];

    countryResult.innerHTML = `
      <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
      <h2>${country.name.common}</h2>
      <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
      <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
    `;
  } catch (error) {
    countryResult.innerHTML = `<p>Country not found. Please try again.</p>`;
    console.error(error);
  }
}
