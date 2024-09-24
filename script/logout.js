const logout = () => {
    const date = new Date()
    const expires = `expires=${date.toUTCString()}`
    document.cookie = "token=0;" + expires + "; path=/; secure ; SameSite=Strict"
    window.location.href = "./"
}

export const logoutBtn = () => {
    const login = document.getElementById("login")
    login.innerText = "logout"
    login.href = "#"
    
    login.addEventListener("click", () => logout())
}