import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const listRef = document.querySelector('.country-list');

inputRef.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  const countryToSearch = inputRef.value.trim();

  if (!countryToSearch) {
    listRef.innerHTML = '';
    return;
  }

  fetchCountries(countryToSearch)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.',
          {
            timeout: 1500,
          }
        );
      } else if (data.length >= 2) {
        createCountriesList(data);
      } else {
        createOneCountry(data);
      }
    })
    .catch(
      _ =>
        Notiflix.Notify.failure('Oops, there is no country with that name', {
          timeout: 1500,
        }),
      (listRef.innerHTML = '')
    );
}

function createCountriesList(arr) {
  const markup = arr
    .map(
      ({ name: { official }, flags: { svg } }) =>
        `<li class="country-item">
        <img width=70px height=50px src="${svg}" alt="${official}>
        <p>
        <span class="country-inf">${official}</span>
        </p>
        </li>`
    )
    .join('');

  listRef.innerHTML = markup;
}

function createOneCountry(arr) {
  const markup = arr
    .map(
      ({
        name: { official },
        flags: { svg },
        languages,
        capital,
        population,
      }) =>
        `<li class="one-country-item">
        <div class="one-country-head">
        <img width=90px height=60px src="${svg}" alt="${official}" />
        <h2>${official}</h2>
        </div>
        <p><span class="country-inf">Capital:</span> ${capital}</p>
        <p><span class="country-inf">Population:</span> ${population}</p>
        <p>
        <span class="country-inf">Languages:</span>
        ${Object.values(languages)}
        </p>
        </li>`
    )
    .join('');

  listRef.innerHTML = markup;
}
