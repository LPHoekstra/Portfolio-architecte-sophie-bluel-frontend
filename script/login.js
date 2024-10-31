import { loginAPI } from "./callApi.js";
import { setErrorMsg } from "./component.js";

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
        const data = await loginAPI(jsonData)

        if (!data.token) {
            throw new Error("Token de connexion manquant")    
        }

        setToken(data)
        window.location.href = "./index.html"
    } catch (error) {
        console.error(error)

        form.prepend(setErrorMsg(error.message))
    }
})

const setToken = (data) => {
    const expirationDate = new Date()
    expirationDate.setTime(expirationDate.getTime() + (60 * 60 * 1000))

    const token = encodeURIComponent(data.token)
    document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/; secure ; SameSite=Strict"`
}