import { deleteWork } from "./callApi.js"

export const createModal = (dataWorks) => {
    const aside = document.createElement("aside")
    aside.setAttribute("id", "modal-hidden")
    aside.classList.add("modal")
    aside.addEventListener("click", () => {
        closeModal(aside)
    })

    // close button
    const close = document.createElement("img")
    close.src = "./assets/icons/close.svg"
    close.alt = "Fermer la fenêtre"
    close.classList.add("modal-wrapper__close")
    close.addEventListener("click", () => {
        closeModal(aside)
    })

    // title
    const title = document.createElement("h2")
    title.innerText = "Galerie photo"

    // main wrapper
    const wrapper = document.createElement("div")
    wrapper.classList.add("modal-wrapper")
    wrapper.addEventListener("click", (event) => {
        event.stopPropagation()
    })

    // modal button
    const btn = document.createElement("button")
    btn.classList.add("btn")
    btn.classList.add("form__btn") // temporary
    btn.innerText = "Ajouter une photo"

    const imgWrapper = modalMenuImgWrapper(dataWorks)

    wrapper.appendChild(close)
    wrapper.appendChild(title)
    wrapper.appendChild(imgWrapper)
    wrapper.appendChild(btn)

    aside.appendChild(wrapper)
    document.querySelector("body").appendChild(aside)
}

export const closeModal = (modal) => {
    modal.setAttribute("id", "modal-hidden")
    document.removeEventListener("keydown", handleEscapeKey)
}

export const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
        const modal = document.querySelector(".modal")
        closeModal(modal)
    }
}

const modalMenuImgWrapper = (dataWorks) => {
    const imgWrapper = document.createElement("div")
    imgWrapper.classList.add("imgWrapper")

    dataWorks.forEach(work => {
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const trash = document.createElement("img")

        figure.id = "workId-" + work.id

        trash.src = "./assets/icons/trash.svg"
        trash.alt = "Supprimer la photo"
        trash.classList.add("modal-wrapper__trash")
        trash.addEventListener("click", () => {
            const parent = trash.parentElement
            const id = parent.id
            const splittedId = id.split("-")[1]

            const response = deleteWork(splittedId)
            if (response.ok) {
                parent.remove()
                console.log(`${id} supprimer avec succès`)
            }
        })

        img.src = work.imageUrl
        img.alt = work.title
        img.classList.add("modal-wrapper__picture")

        figure.appendChild(trash)
        figure.appendChild(img)

        imgWrapper.appendChild(figure)
    })

    return imgWrapper
}