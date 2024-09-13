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
export async function getWorks() {
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

export async function login(formData) {
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

export const deleteWork = async (id) => {
    try {
        const token = getCookie("token")

        if (token === null) {
            throw new Error("Erreur lors de la récupération du token d'authentification")
        }

        const response = await fetch(`${url}works/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })
        
        if (!response.ok) {
            throw new Error("Erreur lors de la suppression du projet")
        }

        return response
    } catch (error) {
        console.error(error)
    }
}