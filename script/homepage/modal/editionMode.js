import { handleEscapeKey } from "./modal.js"

// update home html for edition mode
export const editionMode = () => {
    editModeHeader()
    modifyBtn()
}

const editModeHeader = () => {
    const mainConteneur = document.createElement("div")
    mainConteneur.classList.add("edition-conteneur")

    const edit = document.createElement("span")
    edit.innerText = "Mode édition"

    const editImg = document.createElement("img")
    editImg.src = "./assets/icons/edit.svg"
    editImg.alt = "Icon d'édition"

    mainConteneur.appendChild(editImg)
    mainConteneur.appendChild(edit)

    const body = document.querySelector("body")

    body.prepend(mainConteneur)
}

const modifyBtn = () => {
    const editConteneur = document.createElement("div")
    editConteneur.classList.add("modify-conteneur__clickDiv")

    const edit = document.createElement("span")
    edit.innerText = "Modifier"

    const editImg = document.createElement("img")
    editImg.src = "./assets/icons/edit-black.svg"
    editImg.alt = "Icon d'édition"

    editConteneur.appendChild(editImg)
    editConteneur.appendChild(edit)
    editConteneur.addEventListener("click", () => {
        const modal = document.querySelector(".modal")
        modal.removeAttribute("id")
        document.addEventListener("keydown", handleEscapeKey)
    })

    const title = document.querySelector("#portfolio h2")

    const mainConteneur = document.createElement("div")
    mainConteneur.classList.add("modify-conteneur")

    mainConteneur.appendChild(title)
    mainConteneur.appendChild(editConteneur)

    const portfolio = document.getElementById("portfolio")

    portfolio.prepend(mainConteneur)
}