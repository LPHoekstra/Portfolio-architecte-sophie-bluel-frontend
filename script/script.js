import { getWorks } from "./callApi.js";

async function init() {
    const dataWorks = await getWorks()
    const portfolio = document.getElementById("portfolio")
    
    function filterWorks(category) {
        const gallery = document.querySelector(".gallery")
        gallery.innerHTML = ""
        
        const filteredWorks = category === "Tous" ? dataWorks : dataWorks.filter(work => work.category.name === category)
        
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
    
    function createCategoriesMenu() {
        const conteneur = document.createElement("div")
        conteneur.classList.add("categories-menu")
        
        // add the btn "Tous"
        const allBtn = document.createElement("button")
        allBtn.classList.add("categories-menu__btn")
        allBtn.classList.add("categories-menu__btn--selected")
        allBtn.innerText = "Tous"
        allBtn.addEventListener("click", () => {
            filterWorks(allBtn.innerText)
        })
        conteneur.appendChild(allBtn)
        
        const categoriesNameSet = new Set()
        
        // add all the uniques categories to the set
        dataWorks.forEach(work => {
            categoriesNameSet.add(work.category.name)
        })
        
        // create a btn pour each categories
        categoriesNameSet.forEach(category => {
            const btn = document.createElement("button")
            btn.classList.add("categories-menu__btn")
            
            btn.innerText = category
            
            btn.addEventListener("click", () => filterWorks(category))
            
            conteneur.appendChild(btn)
        })
        
        portfolio.appendChild(conteneur)
        
        // selected btn
        const btnClass = document.querySelectorAll(".categories-menu__btn")
        btnClass.forEach(clickedBtn => {
            clickedBtn.addEventListener("click", () => {
                const previousClicked = document.querySelector(".categories-menu__btn--selected")
                previousClicked.classList.remove("categories-menu__btn--selected")
                clickedBtn.classList.add("categories-menu__btn--selected")
            })
        })
    }
    
    function createGalleryConteneur() {
        const gallery = document.createElement("div")
        gallery.classList.add("gallery")
        portfolio.appendChild(gallery)
    }

    // create first the menu for filter, then the gallery conteneur, and show all the works by default
    createCategoriesMenu()
    createGalleryConteneur()
    filterWorks("Tous")
}

init()
