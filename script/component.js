/** 
 * @param {"message of the error"} message 
 * @returns A span element with the error message
 */
export const setErrorMsg = (message) => {
    const errorMsgExist = document.querySelector(".error-msg")

    const errorText = message === "Failed to fetch"
        ? "Erreur lors de la récupération des données"
        : message

    if (errorMsgExist) {
        errorMsgExist.innerText = errorText
        return errorMsgExist
    }

    const errorMsg = document.createElement("span")
    errorMsg.classList.add("error-msg")
    errorMsg.innerText = errorText

    return errorMsg
}

export const getCookie = (name) => {
    const cookies = document.cookie.split(";")

    for (const cookie of cookies) {
        const [key, value] = cookie.split("=")
        if (key === name) {
            return decodeURIComponent(value)
        }
    }
    return null
}

export const isConnected = () => {
    const token = document.cookie.startsWith("token")
    if (token) {
        return true
    }

    return false
}
