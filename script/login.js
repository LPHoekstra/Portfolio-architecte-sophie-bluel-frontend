import { login } from "./callApi.js";

const form = document.querySelector(".login form")

form.addEventListener("submit", async event => {
    event.preventDefault()

    const formData = new FormData(form)

    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    const jsonData = JSON.stringify(formObject)

    try {
        const data = await login(jsonData)

        setToken(data)

        window.location.href = "./index.html"
    } catch (error) {
        console.error(error)
        
        setErrorMsg(error.message)
    }
})

function setToken(data) {
    const expirationDate = new Date()
    expirationDate.setTime(expirationDate.getTime() + (60 * 60 * 1000))
    const expires = `expires=${expirationDate.toUTCString()}`

    const token = encodeURIComponent(data.token)
    document.cookie = `token=${token}; ${expires}; path=/; secure ; SameSite=Strict"`
}

function setErrorMsg(message) {
    const errorDiv = document.getElementById("error")

    const errorMsg = document.createElement("span")
    errorMsg.innerText = message
    errorMsg.classList.add("error-msg")

    errorDiv.append(errorMsg)
}