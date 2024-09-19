const url = "http://localhost:5678/api/"

const getCookie = (name) => {
    const cookies = document.cookie.split(";")

    for (const cookie of cookies) {
        const [key, value] = cookie.split("=")
        if (key === name) {
            return decodeURIComponent(value)
        }
    }
    return null
}

// Get all works
export async function getWorksAPI() {
    try {
        const response = await fetch(`${url}works`)
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des travaux")
        }

        return response.json()
    } catch (error) {
        console.error(error)
    }
}

export const getCategoriesAPI = async () => {
    try {
        const response = await fetch(`${url}categories`)
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des catégories")
        }

        return response.json()
    } catch (error) {
        console.error(error)
    }
}

export async function loginAPI(formData) {
    const response = await fetch(`${url}users/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: formData
    })
    if (!response.ok) {
        throw new Error("Erreur dans l'identifiant ou le mot de passe")
    }

    return response.json()
}

export const deleteWorkAPI = async (id) => {
    try {
        const token = getCookie("token")

        if (token === null) {
            throw new Error("Erreur lors de la récupération du token d'authentification")
        }

        const response = await fetch(`${url}works/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
        
        if (response.ok) {
            return {ok: true, message: "suppression réussi"}
        }
        
        throw new Error("Erreur lors de la suppression du projet")
    } catch (error) {
        console.error(error)
        return {ok: false, message: error.message}
    }
}

export const addWorkAPI = async (formData) => {
    try {
        const token = getCookie("token")

        const response = await fetch(`${url}works`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData
        })

        if (response.ok) {
            console.log("Created")
            return
        }

        throw new Error("Erreur lors de l'envoie")
    } catch (error) {
        console.error(error)
    }
}