export function filterWorks(category, dataWorks) {
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

export function btnFilterCategory(categories, dataWorks) {
    const container = document.querySelector(".categories-menu")
    container.removeAttribute("style")

    // add the btn "Tous"
    const allBtn = document.createElement("button")
    allBtn.classList.add("categories-menu__btn")
    allBtn.classList.add("categories-menu__btn--selected")
    allBtn.innerText = "Tous"
    allBtn.addEventListener("click", () => {
        filterWorks(allBtn.innerText, dataWorks)
    })
    container.appendChild(allBtn)

    // create a btn for each categories
    categories.forEach(category => {
        const btn = document.createElement("button")
        btn.classList.add("categories-menu__btn")

        btn.innerText = category.name

        btn.addEventListener("click", () => filterWorks(category.name, dataWorks))

        container.appendChild(btn)
    })

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
