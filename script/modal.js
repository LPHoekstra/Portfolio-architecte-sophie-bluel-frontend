import { deleteWorkAPI } from "./callApi.js"
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

const tabAddPicture = (dataWorks) => {
    const modalWrapper = document.querySelector(".modal-wrapper")
    const imgWrapper = document.querySelector(".img-wrapper")
    const addPictureBtn = document.querySelector(".modal-wrapper .btn")
    addPictureBtn.remove()
    imgWrapper.remove()

    // change the title
    const title = document.querySelector(".modal-wrapper h2")
    title.innerText = "Ajout photo"

    // go back arrow
    const goback = document.createElement("img")
    goback.src = "./assets/icons/goback.svg"
    goback.alt = "Revenir au menu précédent"
    goback.classList.add("modal-wrapper__goback")
    goback.addEventListener("click", () => {
        form.remove()
        title.innerText = "Galerie photo"
        tabModalMenu(dataWorks)
    })

    // create the form
    const form = document.createElement("form")
    form.classList.add("form")

    const uploadWrapper = document.createElement("div")
    uploadWrapper.classList.add("upload-wrapper")

    // picture input
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
    addPictureInput.setAttribute("required", true)

    // title input
    const titleFormLabel = document.createElement("label")
    titleFormLabel.setAttribute("for", "title")
    titleFormLabel.innerText = "Titre"
    titleFormLabel.classList.add("form__label")

    const titleFormInput = document.createElement("input")
    titleFormInput.type = "text"
    titleFormInput.name = "title"
    titleFormInput.id = "title"
    titleFormInput.setAttribute("required", true)
    titleFormInput.classList.add("form__input-text")

    // category
    const categoryFormLabel = document.createElement("label")
    categoryFormLabel.setAttribute("for", "category")
    categoryFormLabel.innerText = "Catégorie"
    categoryFormLabel.classList.add("form__label")

    const categoryFormSelect = document.createElement("select")
    categoryFormSelect.value = ""
    categoryFormSelect.name = "category"
    categoryFormSelect.id = "category"
    categoryFormSelect.setAttribute("required", true)
    categoryFormSelect.classList.add("form__input-text")

    // category selection
    const option = document.createElement("option")
    option.value = ""
    option.innerText = ""
    categoryFormSelect.appendChild(option)

    const categoriesNameSet = new Set()

    dataWorks.forEach(work => {
        categoriesNameSet.add(work.category.name)
    })

    categoriesNameSet.forEach(category => {
        const option = document.createElement("option")
        option.value = category
        option.innerText = category

        categoryFormSelect.appendChild(option)
    })

    // btn
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
    form.appendChild(categoryFormSelect)
    form.appendChild(btn)

    modalWrapper.appendChild(goback)
    modalWrapper.appendChild(form)
}