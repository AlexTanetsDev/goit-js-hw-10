import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.querySelector('#search-box'),
countryList: document.querySelector('.country-list'),
countryInfo: document.querySelector('.country-info')
}

refs.input.addEventListener('input', debounce(onInputChange, 300))


  function onInputChange(evt){
    let countryName = evt.target.value.trim();
  if(countryName ===''){
    refs.countryInfo.innerHTML="";
    refs.countryList.innerHTML='';
    return
  }
    fetchCountries(countryName)
    .then((countries) => {
      if(countries.length > 10){
        refs.countryInfo.innerHTML="";
        refs.countryList.innerHTML='';
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        return;
      }else if(countries.length > 1){
        refs.countryInfo.innerHTML="";
        countriesListRender(countries);
    
      }else{
        refs.countryList.innerHTML='';
        coutntryCardRender(countries[0]);
      }
      
    })
    .catch((error) => {
      Notiflix.Notify.failure("Oops, there is no country with that name");
    });
  }

  function countriesListRender(countries){
 const listMarkup = countries.map(country=> createListMarkup(country)).join('');
 refs.countryList.innerHTML = listMarkup;
  }

  function coutntryCardRender(country){
const countryCardMarkup = createCountryCard(country);
refs.countryInfo.innerHTML = countryCardMarkup;
  }

  function createListMarkup({name,flags}){
return `<li>
<div class="country-box"> 
<img class="country-flag" src="${flags.svg}" alt="flag of ${name.official}">
<h3 class="list-country-name">${name.official}</h3>
</div>
</li>`
  }

  function createCountryCard({name,capital,population,flags,languages}){
    const countryLanguages= Object.values(languages).join(', ')
return `<div class="county-card">
<div class="country-box"> 
  <img class="country-flag" src="${flags.svg}" alt="flag of ${name.official}">
  <h2 class="list-country-name">${name.official}</h2>
  </div>
  <p>
  <strong>Capital:</strong>
     ${capital} 
  </p>
  <p>
  <strong> Population:</strong>
     ${population} 
  </p>
  <p>
  <strong> Languages: </strong>
     ${countryLanguages} 
  </p>
</div>`
  }