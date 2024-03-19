function tabs(tabsSelector, tabsContentsSelector, tabsParentsSelector) {
	const tabs = document.querySelectorAll(tabsSelector),
		tabContents = document.querySelectorAll(tabsContentsSelector),
		tabParents = document.querySelector(tabsParentsSelector)

	const hidetabContents = () => {
		tabContents.forEach(tabContent => {
			tabContent.classList.add("hide")
			tabContent.classList.remove("show")
		})
		tabs.forEach(tab => {
			tab.classList.remove("tabheader__item_active")
		})
	}
	function showTabContent(index = 0) {
		tabContents[index].classList.add("show", "fade")
		tabContents[index].classList.remove("hide")
		tabs[index].classList.add("tabheader__item_active")
	}
	hidetabContents()
	showTabContent()

	tabParents.addEventListener("click", event => {
		const target = event.target
		if (target && target.classList.contains("tabheader__item")) {
			tabs.forEach((tab, index) => {
				if (tab === target) {
					hidetabContents()
					showTabContent(index)
				}
			})
		}
	})
}

export default tabs
