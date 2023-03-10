//elements
const $container = document.getElementById('container');
const $radios = document.getElementById('radios');
const $search = document.querySelector('input[placeholder="search"]');
const $reset = document.getElementById('reset');
const $spinner = document.getElementById('spinner');
import { createCards, createCategories, createRadios, filterSearch, filterRadios } from './helpers.js';

let data = []
let categories = ""

// show spinner
const showSpinner = () => {
    $spinner.classList.add('spinner--active');
  };
  showSpinner()
  // hide spinner
  const hideSpinner = () => {
    $spinner.classList.remove('spinner--active');
  };
  
  async function getData() {
    try {
      let apiUrl = "https://planti.onrender.com/api/plantas"
      const response = await fetch(apiUrl);
      const json = await response.json();
      data = json.data;
      hideSpinner();
      createCards(data, $container);
  
      categories = createCategories(data);
      createRadios(categories, $radios);
  
      // eventos...
    } catch (error) {
      console.log(error);
    }
  }

    getData()










  const filterAndPrint = () => {
    let dataFiltered = filterSearch(data, $search.value)
    dataFiltered = filterRadios(dataFiltered)
    if (dataFiltered.length === 0) {
        const $noResults = document.getElementById('no-results')
        $noResults.style.display = 'block'
    } else {
        const $noResults = document.getElementById('no-results')
        $noResults.style.display = 'none'
    }
    createCards(dataFiltered, $container)
}
//EVENTOS
$radios.addEventListener('change', (e) => {
    filterAndPrint();
})

$search.addEventListener('keyup', (e) => {
    filterAndPrint();
})
$reset.addEventListener('click', () => {
    document.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
        radio.checked = false;
    });
    filterAndPrint();
});