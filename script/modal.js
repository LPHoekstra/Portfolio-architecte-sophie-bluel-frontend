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

    
    wrapper.appendChild(close)
    wrapper.appendChild(title)
    
    aside.appendChild(wrapper)
    document.querySelector("body").appendChild(aside)

    // create the img wrapper and btn
    tabModalMenu(dataWorks)
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

const tabModalMenu = (dataWorks) => {
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
        img.classList.add("img-wrapper__picture")

        figure.appendChild(trash)
        figure.appendChild(img)

        imgWrapper.appendChild(figure)
    })

    // modal button
    const btn = document.createElement("button")
    btn.classList.add("btn")
    btn.innerText = "Ajouter une photo"
    btn.addEventListener("click", () => tabAddPicture(dataWorks))

    const modalWrapper = document.querySelector(".modal-wrapper")
    modalWrapper.appendChild(imgWrapper)
    modalWrapper.appendChild(btn)
}

const tabAddPicture = (dataWorks) => {
    const modalWrapper = document.querySelector(".modal-wrapper")
    const imgWrapper = document.querySelector(".img-wrapper")
    const addPictureBtn = document.querySelector(".modal-wrapper .btn")
    addPictureBtn.remove()
    imgWrapper.remove()

    // go back arrow
    const goback = document.createElement("img")
    goback.src = "./assets/icons/goback.svg"
    goback.alt = "Revenir au menu précédent"
    goback.classList.add("modal-wrapper__goback")
    goback.addEventListener("click", () => {
        form.remove()
        tabModalMenu(dataWorks)
    })

    // change the title
    const title = document.querySelector(".modal-wrapper h2")
    title.innerText = "Ajout photo"

    // create the form
    const form = document.createElement("form")
    form.classList.add("form")

    const uploadWrapper = document.createElement("div")
    uploadWrapper.classList.add("upload-wrapper")

    const picture = document.createElement("img")
    picture.src = "./assets/icons/picture.svg"
    picture.alt = "Photo"

    const validFile = document.createElement("p")
    validFile.innerText = "jpg, png : 4mo max"

    const addPictureLabel = document.createElement("label")
    addPictureLabel.classList.add("upload-wrapper__label")
    addPictureLabel.setAttribute("for", "picture")
    addPictureLabel.innerText = "+ Ajouter photo"

    const addPictureInput = document.createElement("input")
    addPictureInput.type = "file"
    addPictureInput.name = "picture"
    addPictureInput.id = "picture"
    addPictureInput.accept = "image/png, image/jpeg"

    const titleFormLabel = document.createElement("label")
    titleFormLabel.setAttribute("for", "title")
    titleFormLabel.innerText = "Titre"
    titleFormLabel.classList.add("form__label")

    const titleFormInput = document.createElement("input")
    titleFormInput.type = "text"
    titleFormInput.name = "title"
    titleFormInput.id = "title"
    titleFormInput.classList.add("form__input-text")

    const categoryFormLabel = document.createElement("label")
    categoryFormLabel.setAttribute("for", "category")
    categoryFormLabel.innerText = "Catégorie"
    categoryFormLabel.classList.add("form__label")

    const categoryFormInput = document.createElement("input")
    categoryFormInput.type = "button" 
    categoryFormInput.value = ""
    categoryFormInput.name = "category"
    categoryFormInput.id = "category"
    categoryFormInput.classList.add("form__input-text")

    const btn = document.createElement("button")
    btn.type = "submit"
    btn.innerText = "Valider"
    btn.classList.add("btn")

    uploadWrapper.appendChild(picture)
    uploadWrapper.appendChild(addPictureLabel)
    uploadWrapper.appendChild(addPictureInput)
    uploadWrapper.appendChild(validFile)

    form.appendChild(uploadWrapper)
    form.appendChild(titleFormLabel)
    form.appendChild(titleFormInput)
    form.appendChild(categoryFormLabel)
    form.appendChild(categoryFormInput)
    form.appendChild(btn)

    modalWrapper.appendChild(goback)
    modalWrapper.appendChild(form)
}