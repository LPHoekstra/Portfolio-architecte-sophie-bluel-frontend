import { getWorks } from "./callApi.js";

// create works element on html
async function createFigureElement() {
    const dataWorks = await getWorks()

    const gallery = document.querySelector("#portfolio .gallery")

    dataWorks.forEach(work => {
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const figcaption = document.createElement("figcaption")
    
        img.src = work["imageUrl"]
        img.alt = work["title"]
        figcaption.innerText = work["title"]
    
        figure.appendChild(img)
        figure.appendChild(figcaption)
    
        gallery.appendChild(figure)
    })
}

createFigureElement()