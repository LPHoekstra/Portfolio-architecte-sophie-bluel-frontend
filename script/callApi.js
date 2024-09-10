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