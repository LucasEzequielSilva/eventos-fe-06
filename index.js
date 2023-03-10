//elements
const $container = document.getElementById('container');
const fragment = document.createDocumentFragment();
const $radios = document.getElementById('radios');
const $search = document.querySelector('input[placeholder="search"]');
const $reset = document.getElementById('reset');
const $spinner = document.getElementById('spinner');

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
        fetch(apiUrl)
            .then(res => res.json()) //leer la información en un formato que entendamos (como json)
            .then(res => {
                data = res.data/* igualo mi variable vacia a la respuesta.data (esto porque la respuesta es un objeto si no entienden hagan console.log hasta de su tia) */
                hideSpinner()
                createCards(data, $container)

                categories = createCategories(data)
                createRadios(categories, $radios)

                /* EVENTOS */
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
            })
    } catch (error) {
        console.log(error)
    }
}

    getData()

const createCards = (array, container) => {
    container.innerHTML = ""
    array.forEach(plant => {
        let div = document.createElement('div');
        div.className = 'card'
        div.innerHTML = `
        <img src="${plant.photo[0]}" alt="${plant.name}"/>
        <h4>${plant.name}</h4>
        `
        fragment.appendChild(div)
    })
    container.appendChild(fragment)
}

const createCategories = (array) => {
    let categories = array.map(category => category.type)

    categories = categories.reduce((acumulador, elemento) => {
        if (!acumulador.includes(elemento)) {
            acumulador.push(elemento);
        }
        return acumulador
    }, [])
    return categories
}

const createRadios = (array, container) => {
    array.forEach(category => {
        let div = document.createElement('div')
        div.className = `radios-container ${category.toLowerCase()}`
        div.innerHTML = `
        <input type="radio" id="${category.toLowerCase()}" name="category" value="${category.toLowerCase()}" />
        <label for="${category.toLowerCase()}">${category}</label>
        `
        container.appendChild(div)
    })
}

const filterSearch = (array, value) => {
    let filteredArray = array.filter(element => element.name.toLowerCase().includes(value.toLowerCase()))
    return filteredArray
}

const filterRadios = (array) => {
    let checked = document.querySelector('input[type="radio"]:checked');
    if (checked) {
      let filteredArray = array.filter(element => element.type.toLowerCase().includes(checked.value.toLowerCase()))
      return filteredArray
    } else {
      return array;
    }
  }