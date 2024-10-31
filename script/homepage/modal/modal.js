import { deleteWorkAPI } from "../../callApi.js"
import { tabAddPicture } from "./addPictureModal.js"
import { filterWorks } from "../worksPresentationHome.js"
import { setErrorMsg } from "../../component.js"
import { changeDataWorks, dataWorks } from "../homepage.js"

export const createModal = () => {
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
    tabModalMenu()
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

export const tabModalMenu = () => {
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

            try {
                const response = await deleteWorkAPI(splittedId)

                if (response.ok) {
                    parent.remove()
                    const filteredDataWorks = dataWorks.filter(work => work.id !== Number(splittedId))
                    changeDataWorks(filteredDataWorks)
                    filterWorks("Tous")
                }
            } catch (error) {
                btn.insertAdjacentElement("beforebegin", setErrorMsg(error.message))
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
    btn.classList.add("modal-wrapper__button")
    btn.innerText = "Ajouter une photo"
    btn.addEventListener("click", () => {
        imgWrapper.remove()
        btn.remove()
        document.querySelector(".modal-wrapper h2").innerText = "Ajout photo"
        tabAddPicture()
    })

    modalWrapper.appendChild(imgWrapper)
    modalWrapper.appendChild(btn)
}