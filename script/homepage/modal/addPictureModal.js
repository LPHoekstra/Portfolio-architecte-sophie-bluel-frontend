import { setErrorMsg } from "../../component.js"
import { filterWorks } from "../worksPresentationHome.js"
import { addWorkAPI } from "./../../callApi.js"
import { categories, changeDataWorks, dataWorks } from "./../homepage.js"
import { tabModalMenu } from "./modal.js"

// function for the tab "add picture"
export const tabAddPicture = () => {
    const modalWrapper = document.querySelector(".modal-wrapper")

    // when tabAddPicture is rerender remove the form
    const clearForm = document.querySelector(".modal-form")
    if (clearForm) {
        clearForm.remove()
    }

    // go back arrow
    const arrowExist = document.querySelector(".modal-wrapper__goback")
    if (!arrowExist) {
        const goback = document.createElement("img")
        goback.src = "./assets/icons/goback.svg"
        goback.alt = "Revenir au menu précédent"
        goback.classList.add("modal-wrapper__goback")
        goback.addEventListener("click", () => {
            document.querySelector(".modal-form").remove()
            goback.remove()
            document.querySelector(".modal-wrapper h2").innerText = "Galerie photo"
            tabModalMenu()
        })

        modalWrapper.appendChild(goback)
    }

    // create the form
    const form = document.createElement("form")
    form.classList.add("form")
    form.classList.add("modal-form")

    // wrapper for picture upload
    const uploadWrapper = document.createElement("div")
    uploadWrapper.classList.add("upload-wrapper")

    // picture input
    pictureInput(uploadWrapper)

    // title input
    const titleFormLabel = document.createElement("label")
    titleFormLabel.setAttribute("for", "title")
    titleFormLabel.innerText = "Titre"
    titleFormLabel.classList.add("modal-form__label")

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
    categoryFormLabel.classList.add("modal-form__label")

    const containerFormSelect = document.createElement("div")
    containerFormSelect.classList.add("custom-select")

    const categoryFormSelect = document.createElement("select")
    categoryFormSelect.value = ""
    categoryFormSelect.name = "category"
    categoryFormSelect.id = "category"
    categoryFormSelect.setAttribute("required", true)
    categoryFormSelect.classList.add("modal-form__select")

    containerFormSelect.appendChild(categoryFormSelect)

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

    // wrapper for title and category
    const titleCategoryWrapper = document.createElement("div")
    titleCategoryWrapper.classList.add("title-category-wrapper")

    titleCategoryWrapper.appendChild(titleFormLabel)
    titleCategoryWrapper.appendChild(titleFormInput)
    titleCategoryWrapper.appendChild(categoryFormLabel)
    titleCategoryWrapper.appendChild(containerFormSelect)

    // btn
    const btn = document.createElement("button")
    btn.type = "submit"
    btn.innerText = "Valider"
    btn.classList.add("btn")
    btn.classList.add("modal-wrapper__button")
    btn.classList.add("modal-form__not-valid")

    form.appendChild(uploadWrapper)
    form.appendChild(titleCategoryWrapper)
    form.appendChild(btn)

    modalWrapper.appendChild(form)

    const addPictureInput = document.getElementById("picture")
    form.addEventListener("change", () => {
        try {
            validateForm(addPictureInput, titleFormInput, categoryFormSelect)
        } catch (error) {
            console.error(error)

            btn.insertAdjacentElement("beforebegin", setErrorMsg(error.message))
        }
    })

    form.addEventListener("submit", async (event) => {
        event.preventDefault()
        try {
            if (!validateForm(addPictureInput, titleFormInput, categoryFormSelect)) {
                throw new Error("Formulaire invalide")
            }

            const formData = new FormData()
            formData.append("title", titleFormInput.value)
            formData.append("image", addPictureInput.files[0])
            formData.append("category", Number(categoryFormSelect.value))

            const response = await addWorkAPI(formData)

            // empty the form
            tabAddPicture()

            // to update the UI without reloading the page
            const formObject = {
                id: response.id,
                title: response.title,
                imageUrl: response.imageUrl,
                category: {
                    categoryId: response.categoryId,
                }
            }

            const dataWorksPushed = [...dataWorks, formObject]
            changeDataWorks(dataWorksPushed)
            filterWorks("Tous")
        } catch (error) {
            console.error(error)

            btn.insertAdjacentElement("beforebegin", setErrorMsg(error.message))
        }
    })
}

const pictureInput = (uploadWrapper) => {
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
    addPictureLabel.ariaLabel = "Ajouter une photo"

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

    if (addPictureInput.files[0]) {
        updateImageDisplay(addPictureInput)
        // error message removed if exist
        const errorMsgExist = document.querySelector(".error-msg")
        errorMsgExist ? errorMsgExist.remove() : null
        
        if (titleFormInput.value && categoryFormSelect.value !== "") {
            validBtn.classList.remove("modal-form__not-valid")
            
            return true
        } else {
            validBtn.classList.add("modal-form__not-valid")
        }
    } else {
        validBtn.classList.add("modal-form__not-valid")
    }
}

const updateImageDisplay = (input) => {
    const file = input.files[0]

    if (validFileType(file.type) && validFileSize(file.size)) {
        const img = document.createElement("img")
        img.src = window.URL.createObjectURL(file)
        img.classList.add("upload-wrapper__photo")

        const wrapper = document.querySelector(".upload-wrapper")
        wrapper.innerHTML = ""

        wrapper.appendChild(img)
    }
}

const validFileType = (fileToValidate) => {
    const fileTypes = ["image/png", "image/jpeg"]

    if (fileTypes.includes(fileToValidate)) {
        return true
    }
    
    throw new Error("type de fichier invalide")
}

const validFileSize = (fileToValidate) => {
    if (fileToValidate < 4000000) {
        return true
    }
    
    throw new Error("taille du fichier trop volumineux")
}