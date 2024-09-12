import { worksPresentationHome } from "./worksPresentationHome.js";

worksPresentationHome()

const token = document.cookie.startsWith("token")
if (token) {
    // logout btn
    const login = document.getElementById("login")
    login.innerText = "logout"
    login.href = "#"

    login.addEventListener("click", () => logout())

    editionMode()
}

function logout() {
    const date = new Date()
    const expires = `expires=${date.toUTCString()}`
    document.cookie = "token=0;" + expires + "; path=/; secure ; SameSite=Strict"
    window.location.href = "./"
}

function editionMode() {

    // uptade home html for edition mode
    editModeHeader()
    modifyBtn()
}

function editModeHeader() {
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

function modifyBtn() {
    const editConteneur = document.createElement("div")
    editConteneur.classList.add("modify-conteneur__clickDiv")

    const edit = document.createElement("span")
    edit.innerText = "Modifier"

    const editImg = document.createElement("img")
    editImg.src = "./assets/icons/edit-black.svg"
    editImg.alt = "Icon d'édition"

    editConteneur.appendChild(editImg)
    editConteneur.appendChild(edit)

    const title = document.querySelector("#portfolio h2")

    const mainConteneur = document.createElement("div")
    mainConteneur.classList.add("modify-conteneur")

    mainConteneur.appendChild(title)
    mainConteneur.appendChild(editConteneur)

    const portfolio = document.getElementById("portfolio")

    portfolio.prepend(mainConteneur)
}