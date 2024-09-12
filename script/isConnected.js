export const isConnected = () => {
    const token = document.cookie.startsWith("token")
    if (token) {
        return true
    }

    return false
}
