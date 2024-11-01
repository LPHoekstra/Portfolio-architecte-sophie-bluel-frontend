import { btnFilterCategory, filterWorks } from "./worksPresentationHome.js";
import { logoutBtn } from "../logout.js";
import { isConnected, setErrorMsg } from "../component.js";
import { getCategoriesAPI, getWorksAPI } from "../callApi.js";
import { createModal } from "./modal/modal.js";
import { editionMode } from "./modal/editionMode.js";

export let categories = null
export let dataWorks = null

try {
    const fetchCategories = await getCategoriesAPI()
    const fetchDataWorks = await getWorksAPI()

    categories = fetchCategories
    dataWorks = fetchDataWorks
} catch(error) {
    const portfolio = document.querySelector("#portfolio")
    portfolio.appendChild(setErrorMsg(error.message))

    console.error(error)
}

export const changeDataWorks = (dataChange) => {
    dataWorks = dataChange
}

if (isConnected()) {
    logoutBtn()
    editionMode()
    createModal()
} else if (categories) {
    btnFilterCategory(categories)
}

if (dataWorks) {
    filterWorks("Tous")
}