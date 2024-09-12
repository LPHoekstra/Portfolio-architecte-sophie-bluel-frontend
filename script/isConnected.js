const token = document.cookie.startsWith("token")

if (token) {
    // logout btn
    const login = document.getElementById("login")
    login.innerText = "logout"
    login.href = "#"

    login.addEventListener("click", () => logout())
}

function logout() {
    const date = new Date()
    const expires = `expires=${date.toUTCString()}`
    document.cookie = "token=0;" + expires + "; path=/; secure ; SameSite=Strict"
    window.location.href = "./"
}