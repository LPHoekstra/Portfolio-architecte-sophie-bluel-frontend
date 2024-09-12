// Get all works
export async function getWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works")
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des travaux")
        }

        return response.json()
    } catch (error) {
        console.error(error)
    }
}

export async function login(formData) {
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: formData
    })
    if (!response.ok) {
        throw new Error("Erreur dans l'identifiant ou le mot de passe")
    }

    return response.json()
}