export const createModal = (dataWorks) => {
    const aside = document.createElement("aside")
    aside.setAttribute("id", "modal-hidden")
    aside.classList.add("modal")
    aside.addEventListener("click", (event) => {
        aside.setAttribute("id", "modal-hidden")
    })

    const close = document.createElement("img")
    close.src = "./assets/icons/close.svg"
    close.alt = "Fermer la fenêtre"
    close.classList.add("modal-wrapper__close")
    close.addEventListener("click", () => {
        aside.setAttribute("id", "modal-hidden")
    })

    const title = document.createElement("h2")
    title.innerText = "Galerie photo"

    const wrapper = document.createElement("div")
    wrapper.classList.add("modal-wrapper")
    wrapper.addEventListener("click", (event) => {
        event.stopPropagation()
    })

    const imgWrapper = document.createElement("div")
    imgWrapper.classList.add("imgWrapper")

    const btn = document.createElement("button")
    btn.classList.add("btn")
    btn.classList.add("form__btn") // temporary
    btn.innerText = "Ajouter une photo"

    dataWorks.forEach(work => {
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const trash = document.createElement("img")

        trash.src = "./assets/icons/trash.svg"
        trash.alt = "Supprimer la photo"
        trash.classList.add("modal-wrapper__trash")

        img.src = work.imageUrl
        img.alt = work.title
        img.classList.add("modal-wrapper__picture")

        figure.appendChild(trash)
        figure.appendChild(img)

        imgWrapper.appendChild(figure)
    })

    wrapper.appendChild(close)
    wrapper.appendChild(title)
    wrapper.appendChild(imgWrapper)
    wrapper.appendChild(btn)

    aside.appendChild(wrapper)
    document.querySelector("body").appendChild(aside)
}