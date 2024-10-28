import { btnFilterCategory, filterWorks } from "./worksPresentationHome.js";
import { logoutBtn } from "../logout.js";
import { isConnected } from "../component.js";
import { getCategoriesAPI, getWorksAPI } from "../callApi.js";
import { createModal } from "./modal/modal.js";
import { editionMode } from "./modal/editionMode.js";

export const categories = await getCategoriesAPI()
export let dataWorks = await getWorksAPI()

export const changeDataWorks = (dataChange) => {
    dataWorks = dataChange
}

if (isConnected()) {
    logoutBtn()
    editionMode()
    createModal()
} else {
    btnFilterCategory(categories)
}

filterWorks("Tous")