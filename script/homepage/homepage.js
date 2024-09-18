import { btnFilterCategory, filterWorks } from "./worksPresentationHome.js";
import { logoutBtn } from "../logout.js";
import { isConnected } from "../isConnected.js";
import { getCategoriesAPI, getWorksAPI } from "../callApi.js";
import { createModal } from "./modal.js";
import { editionMode } from "./editionMode.js";

const connected = isConnected()

export const categories = await getCategoriesAPI()
let dataWorks = await getWorksAPI()

if (connected) {
    logoutBtn()
    editionMode()
    createModal(dataWorks)
} else {
    btnFilterCategory(categories, dataWorks)
}

filterWorks("Tous", dataWorks)