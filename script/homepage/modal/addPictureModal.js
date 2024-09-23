import { addWorkAPI } from "./../../callApi.js"
import { categories } from "./../homepage.js"
import { tabModalMenu } from "./modal.js"

// function for the tab "add picture"
export const tabAddPicture = (dataWorks) => {
    const modalWrapper = document.querySelector(".modal-wrapper")
    const imgWrapper = document.querySelector(".img-wrapper")
    const addPictureBtn = document.querySelector(".modal-wrapper .btn")
    addPictureBtn.remove()

    if (imgWrapper) {
        imgWrapper.remove()
    }

    // when tabAddPicture is rerender remove the form and goback arrow
    const clearForm = document.querySelector(".modal-form")
    if (clearForm) {
        clearForm.remove()
    }
    const arrowExist = document.querySelector(".modal-wrapper__goback")
    if (arrowExist) {
        arrowExist.remove()
    }

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
        goback.remove()
        title.innerText = "Galerie photo"
        tabModalMenu(dataWorks)
    })

    // create the form
    const form = document.createElement("form")
    form.classList.add("form")
    form.classList.add("modal-form")

    // wrapper for picture upload
    const uploadWrapper = document.createElement("div")
    uploadWrapper.classList.add("upload-wrapper")

    // picture input
    defaultPictureInput(uploadWrapper)

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

    categories.forEach(category => {
        const option = document.createElement("option")
        option.value = category.id
        option.innerText = category.name

        categoryFormSelect.appendChild(option)
    })

    // btn
    const btn = document.createElement("button")
    btn.type = "submit"
    btn.innerText = "Valider"
    btn.classList.add("btn")
    btn.classList.add("modal-form__not-valid")

    form.appendChild(uploadWrapper)
    form.appendChild(titleFormLabel)
    form.appendChild(titleFormInput)
    form.appendChild(categoryFormLabel)
    form.appendChild(categoryFormSelect)
    form.appendChild(btn)

    modalWrapper.appendChild(goback)
    modalWrapper.appendChild(form)

    const addPictureInput = document.getElementById("picture")
    form.addEventListener("change", () => validateForm(addPictureInput, titleFormInput, categoryFormSelect))
    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        const isValid = validateForm(addPictureInput, titleFormInput, categoryFormSelect)
        if (!isValid) {
            console.error("Formulaire invalide")
            return
        }

        const formData = new FormData()
        formData.append("title", titleFormInput.value)
        formData.append("image", addPictureInput.files[0])
        formData.append("category", Number(categoryFormSelect.value))

        const response = await addWorkAPI(formData)

        if (response.ok) {
            tabAddPicture(dataWorks)
            console.log('vidage du form')
        }
    })
}

const defaultPictureInput = (uploadWrapper) => {
    uploadWrapper.innerHTML = ""

    const picture = document.createElement("img")
    picture.src = "./assets/icons/picture.svg"
    picture.alt = "Photo"
    picture.classList.add("upload-wrapper__photo-icon")

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

    uploadWrapper.appendChild(picture)
    uploadWrapper.appendChild(addPictureLabel)
    uploadWrapper.appendChild(addPictureInput)
    uploadWrapper.appendChild(validFile)
}

const validateForm = (addPictureInput, titleFormInput, categoryFormSelect) => {
    const validBtn = document.querySelector(".modal-form button")

    if (updateImageDisplay(addPictureInput)) {
        console.log("image valide")

        if (titleFormInput.value !== "") {
            console.log("titre valide")

            if (categoryFormSelect.value !== "") {

                if (validBtn.classList.contains("modal-form__not-valid")) {
                    validBtn.classList.remove("modal-form__not-valid")
                }
                console.log("btn clickable pour envoyer le form")

                return true
            } else {

                if (!validBtn.classList.contains("modal-form__not-valid")) {
                    validBtn.classList.add("modal-form__not-valid")
                }
            }
        } else {

            if (!validBtn.classList.contains("modal-form__not-valid")) {
                validBtn.classList.add("modal-form__not-valid")
            }
            console.log("titre non valide")
        }
    } else {

        if (!validBtn.classList.contains("modal-form__not-valid")) {
            validBtn.classList.add("modal-form__not-valid")
        }
        console.log("image non valide")
    }
}

const updateImageDisplay = (input) => {
    const file = input.files[0]

    if (file) {
        if (validFileType(file.type) && validFileSize(file.size)) {
            const img = document.createElement("img")
            img.src = window.URL.createObjectURL(file)
            img.classList.add("upload-wrapper__photo")

            const wrapper = document.querySelector(".upload-wrapper")
            wrapper.innerHTML = ""

            wrapper.appendChild(img)

            return true
        }
    }

    return false
}

const validFileType = (fileToValidate) => {
    const fileTypes = ["image/png", "image/jpeg"]
    return fileTypes.includes(fileToValidate)
}

const validFileSize = (fileToValidate) => {
    if (fileToValidate < 4000000) {
        return true
    }
    return false
}