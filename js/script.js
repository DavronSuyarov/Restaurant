"use stcict"
import classes from "./modules/class"
import form from "./modules/form"
import loader from "./modules/loader"
import modal, { openModal } from "./modules/modal"
import slider from "./modules/slider"
import tabs from "./modules/tabs"
import timer from "./modules/timer"

window.addEventListener("DOMContentLoaded", () => {
	const modalTimerId = setTimeout(
		() => openModal(".modal", ".modal__content", modalTimerId),
		6000
	)
	tabs(".tabheader__item", ".tab_content", ".tabheader__items")
	loader(".loader-wrapper")
	timer("2024-09-09")
	modal("[data-modal]", ".modal", ".modal__content", modalTimerId)
	classes(".offers-items")
	slider()
	form("form", modalTimerId)
})
