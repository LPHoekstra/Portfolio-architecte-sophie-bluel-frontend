import { deleteWorkAPI } from "../callApi.js"
import { tabAddPicture } from "./addPictureModal.js"
import { filterWorks } from "./worksPresentationHome.js"

export const createModal = (dataWorks) => {
    const aside = document.createElement("aside")
    aside.setAttribute("id", "modal-hidden")
    aside.classList.add("modal")
    aside.addEventListener("mousedown", () => {
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
    wrapper.addEventListener("mousedown", (event) => {
        event.stopPropagation()
    })

    wrapper.appendChild(close)
    wrapper.appendChild(title)

    aside.appendChild(wrapper)
    document.querySelector("body").appendChild(aside)

    // create the img wrapper and btn
    tabModalMenu(dataWorks)
}

const closeModal = (modal) => {
    modal.setAttribute("id", "modal-hidden")
    document.removeEventListener("keydown", handleEscapeKey)
}

export const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
        const modal = document.querySelector(".modal")
        closeModal(modal)
    }
}

export const tabModalMenu = (dataWorks) => {
    const modalWrapper = document.querySelector(".modal-wrapper")
    const imgWrapper = document.createElement("div")
    imgWrapper.classList.add("img-wrapper")

    dataWorks.forEach(work => {
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const trash = document.createElement("img")

        figure.id = "workId-" + work.id

        trash.src = "./assets/icons/trash.svg"
        trash.alt = "Supprimer la photo"
        trash.classList.add("img-wrapper__trash")

        // delete work feature
        trash.addEventListener("click", async () => {
            const parent = trash.parentElement
            const id = parent.id
            const splittedId = id.split("-")[1]

            const response = await deleteWorkAPI(splittedId)
            if (response.ok) {
                parent.remove()
                dataWorks = dataWorks.filter(work => work.id !== Number(splittedId))
                filterWorks("Tous", dataWorks)
                console.log(`${id} supprimer avec succès`)
            } else {
                const errorMsg = document.createElement("span")
                errorMsg.innerText = error.message
                errorMsg.classList.add("error-msg")
                modalWrapper.prepend(errorMsg)
                console.error(error)
            }
        })

        img.src = work.imageUrl
        img.alt = work.title
        img.classList.add("img-wrapper__picture")

        figure.appendChild(trash)
        figure.appendChild(img)

        imgWrapper.appendChild(figure)
    })

    // add work button
    const btn = document.createElement("button")
    btn.classList.add("btn")
    btn.innerText = "Ajouter une photo"
    btn.addEventListener("click", () => tabAddPicture(dataWorks))

    modalWrapper.appendChild(imgWrapper)
    modalWrapper.appendChild(btn)
}