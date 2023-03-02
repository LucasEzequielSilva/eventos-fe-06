//data
import data from './data.js'
//elements
const $container = document.getElementById('container');
const fragment = document.createDocumentFragment();
const $radios = document.getElementById('radios');
const $search = document.querySelector('input[placeholder="search"]');

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

createCards(data, $container)

const createCategories = (array) =>{
    let categories = array.map(category=> category.type)

    categories = categories.reduce((acumulador, elemento)=>{
        if(!acumulador.includes(elemento)){
            acumulador.push(elemento);
        }
        return acumulador
    }, [])
    return categories 
}
let categories = createCategories(data)
const createRadios = (array, container) => {
    array.forEach( category=>{
        let div = document.createElement('div')
        div.className = `radios-container ${category.toLowerCase()}`
        div.innerHTML = `
        <input type="radio" id="${category.toLowerCase()}" name="category" />
        <label for="${category.toLowerCase()}">${category}</label>
        `
        container.appendChild(div)
    })
}
createRadios(categories, $radios)

const filterSearch = (array, value) => {
        let filteredArray = array.filter(element=> element.name.toLowerCase().includes(value.toLowerCase()))
            return filteredArray
}
const filterRadios = (array) => {
    let checked = document.querySelector('input[type="radio"]:checked');
    console.log(checked)
     let filteredArray = array.filter(element => element.type.toLowerCase().includes(checked.id.toLowerCase()))
     return filteredArray
}

const filterAndPrint =  (array) =>{
    let arrayFiltered = filterSearch(array, $search.value)
    arrayFiltered = filterRadios(arrayFiltered)
    return arrayFiltered
}

 $search.addEventListener('keyup', (e) =>{
    let dataFilter = filterAndPrint(data)
    createCards(dataFilter, $container)
})

$radios.addEventListener('change', ()=>{
    let dataFilter = filterAndPrint(data)
    createCards(dataFilter, $container)
}) 