const BASE_URL = 'https://restcountries.com/v3.1';
const END_POINT = '/name/';

function fetchCountries(name) {
  return fetch(
    `${BASE_URL}${END_POINT}${name}?fields=name,capital,population,flags,languages`
  )
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .catch(err => console.log(err));
}

export { fetchCountries };
