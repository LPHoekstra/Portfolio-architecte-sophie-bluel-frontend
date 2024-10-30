import { dataWorks } from "./homepage.js"

export const filterWorks = (category) => {
    const gallery = document.querySelector(".gallery")
    gallery.innerHTML = ""

    const filteredWorks = category === "Tous" ?
        dataWorks
        :
        dataWorks.filter(work => work.category.name === category)

    filteredWorks.forEach(work => {
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const figcaption = document.createElement("figcaption")

        img.src = work.imageUrl
        img.alt = work.title
        figcaption.innerText = work.title

        figure.appendChild(img)
        figure.appendChild(figcaption)

        gallery.appendChild(figure)
    })
}

export const btnFilterCategory = (categories) => {
    const container = document.createElement("div")
    container.classList.add("categories-menu")
    
    const h2Portfolio = document.querySelector("#portfolio h2")
    h2Portfolio.insertAdjacentElement("afterend", container)

    // add the btn "Tous"
    const allBtn = document.createElement("button")
    allBtn.classList.add("categories-menu__btn")
    allBtn.classList.add("categories-menu__btn--selected")
    allBtn.innerText = "Tous"
    allBtn.addEventListener("click", () => {
        filterWorks(allBtn.innerText)
    })
    selectedBtnClass(allBtn)

    container.appendChild(allBtn)

    // create a btn for each categories
    categories.forEach(category => {
        const btn = document.createElement("button")
        btn.classList.add("categories-menu__btn")
        selectedBtnClass(btn)

        btn.innerText = category.name

        btn.addEventListener("click", () => filterWorks(category.name))

        container.appendChild(btn)
    })
}

// add an eventListener for a btn to apply the style when is clicked
const selectedBtnClass = (btn) => {
    btn.addEventListener("click", () => {
        const previousClicked = document.querySelector(".categories-menu__btn--selected")
        previousClicked.classList.remove("categories-menu__btn--selected")
        btn.classList.add("categories-menu__btn--selected")
    })
}