// === Dark Mode Toggle ===
const darkModeBtn = document.getElementById("dark-mode-btn");
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (currentTheme === 'dark') {
        darkModeBtn.innerHTML = `<i class='bx bxs-moon'></i> Light Mode`;
    }
}

darkModeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
        document.documentElement.removeAttribute("data-theme");
        darkModeBtn.innerHTML = `<i class='bx bx-moon'></i> Dark Mode`;
        localStorage.setItem("theme", "light");
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        darkModeBtn.innerHTML = `<i class='bx bxs-moon'></i> Light Mode`;
        localStorage.setItem("theme", "dark");
    }
});


// === Country Filter/Search ===
const countryListContainer = document.getElementById('country-list-container');
const searchInput = document.getElementById('search-input');
const filterRegionDropdown = document.getElementById('filter-input');
let allCountries = [];

searchInput.addEventListener('input', updateCountryResults);
filterRegionDropdown.addEventListener('change', updateCountryResults);

function getSearchInput() {
    return searchInput.value.toLowerCase().trim();
}

function getFilterInput() {
    return filterRegionDropdown.value;
}

function searchResults(countryData, searchQuery) {
    return countryData.filter(item =>
        item.name?.common?.toLowerCase().includes(searchQuery)
    );
}


function filterResults(countryData, filterOption) {
    return countryData.filter(item => item.region.toLowerCase().includes(filterOption.toLowerCase().trim()));
}

function updateCountryResults() {
    const searchTerm = getSearchInput();
    const selectedFilter = getFilterInput();
    const filteredResults = filterResults(allCountries, selectedFilter);
    const searchTermResults = searchResults(filteredResults, searchTerm);
    displayCountries(searchTermResults);
}

async function fetchCountries() {
    const res = await fetch('https://restcountries.com/v3.1/all');
    const data = await res.json();
    allCountries = data;
    displayCountries(data);
}

function displayCountries(countriesData) {
    countryListContainer.innerHTML = '';
    countriesData.forEach(country => {
        const countryItem = document.createElement('button');
        countryItem.classList.add('country-item');
        countryItem.innerHTML = `
            <img src='${country.flags.png}'>
            <div class='country-quick-info'>
                <h2 class='country-name'>${country.name.common}</h2>
                <p><strong>Population</strong>: ${country.population.toLocaleString()}</p>
                <p><strong>Region</strong>: ${country.region}</p>
                <p><strong>Capital</strong>: ${country.capital}</p>
            </div>
        `;
        countryListContainer.appendChild(countryItem);

        countryItem.addEventListener("click", () => {
            countryListContainer.style.display = 'none';
            document.getElementById('country-detail-container').classList.add("show");
            displayCountryDetail(country);
        });
    });
}

function displayCountryDetail(selectedCountry) {
    const countryDetailContainer = document.getElementById('country-detail-container');
    countryDetailContainer.innerHTML = `
        <button id='back-btn' class='back-btn'><i class='bx bx-left-arrow-alt'></i> Back</button>
        <div class='country-information'>
            <div class='country-flag'>
                <img src='${selectedCountry.flags.png}'>
            </div>
            <div class='country-details'>
                <h1>${selectedCountry.name.common}</h1>
                <ul>
    <li><strong>Native Name:</strong> ${selectedCountry?.nativeName?.por.official || 'N/A'}</li>
    <li><strong>Population:</strong> ${selectedCountry.population?.toLocaleString() || 'N/A'}</li>
    <li><strong>Region:</strong> ${selectedCountry.region || 'N/A'}</li>
    <li><strong>Sub Region:</strong> ${selectedCountry.subregion || 'N/A'}</li>
    <li><strong>Capital:</strong> ${selectedCountry.capital || 'N/A'}</li>
    <li><strong>Top Level Domain:</strong> ${selectedCountry.topLevelDomain?.[0] || 'N/A'}</li>
    <li><strong>Currency:</strong> ${selectedCountry.currencies?.[0]?.name || 'N/A'}</li>
    <li><strong>Languages:</strong> ${
        Array.isArray(selectedCountry.languages) && selectedCountry.languages.length > 0
        ? selectedCountry.languages.map(lang => lang.name).join(', ')
        : 'N/A'
    }</li>
</ul>
                ${
                    selectedCountry.borders && selectedCountry.borders.length > 0
                    ? `<div class='country-borders'><strong>Border Countries:</strong> ${selectedCountry.borders.map(border => `<span>${border}</span>`).join(' ')}</div>`
                    : `<div><strong>Border Countries:</strong> None</div>`
                }
            </div>
        </div>
    `;

    const backBtn = countryDetailContainer.querySelector('#back-btn');
    backBtn.addEventListener('click', () => {
        countryDetailContainer.innerHTML = "";
        countryDetailContainer.classList.remove('show');
        countryListContainer.style.display = 'grid';
    });
}

fetchCountries();
