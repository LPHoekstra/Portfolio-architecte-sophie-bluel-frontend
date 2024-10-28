/** 
 * @param {"message of the error"} message 
 * @returns A span element with the error message
 */
export const setErrorMsg = (message) => {
    const errorMsgExist = document.querySelector(".error-msg")

    if (!errorMsgExist) {
        const errorMsg = document.createElement("span")
        errorMsg.innerText = message
        errorMsg.classList.add("error-msg")

        return errorMsg
    } else {
        errorMsgExist.innerText = message
    }

    return errorMsgExist
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
