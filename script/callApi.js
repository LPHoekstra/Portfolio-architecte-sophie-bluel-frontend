import { getCookie } from "./component.js"

const url = "http://localhost:5678/api/"

// Get all works
export const getWorksAPI = async () => {
        const response = await fetch(`${url}works`)
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des projets")
        }

        return response.json()
}

export const getCategoriesAPI = async () => {
        const response = await fetch(`${url}categories`)
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des catégories")
        }

        return response.json()
}

export const loginAPI = async (formData) => {
    const response = await fetch(`${url}users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: formData
    })
    if (!response.ok) {
        throw new Error("Erreur dans l'identifiant ou le mot de passe")
    }

    return response.json()
}

export const deleteWorkAPI = async (id) => {
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
        return { ok: true, message: "suppression réussi" }
    }

    throw new Error("Erreur lors de la suppression du projet")
}

export const addWorkAPI = async (formData) => {
    const token = getCookie("token")

    if (!token) {
        throw new Error("Erreur lors de la récupération du token d'authentification")
    }

    const response = await fetch(`${url}works`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: formData
    })

    if (response.ok) {
        return response.json()
    }

    throw new Error("Erreur lors de l'envoie du formulaire")
}