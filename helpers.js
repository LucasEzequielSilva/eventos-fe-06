const fragment = document.createDocumentFragment();

export const createCards = (array, container) => {
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

  export const createCategories = (array) => {
    let categories = array.map(category => category.type)

    categories = categories.reduce((acumulador, elemento) => {
        if (!acumulador.includes(elemento)) {
            acumulador.push(elemento);
        }
        return acumulador
    }, [])
    return categories
}
  
  export const createRadios = (array, container) => {
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
  
  export const filterSearch = (array, value) => {
    let filteredArray = array.filter(element => element.name.toLowerCase().includes(value.toLowerCase()))
    return filteredArray
}
  
  export const filterRadios = (array) => {
    let checked = document.querySelector('input[type="radio"]:checked');
    if (checked) {
      let filteredArray = array.filter(element => element.type.toLowerCase().includes(checked.value.toLowerCase()))
      return filteredArray
    } else {
      return array;
    }
  }