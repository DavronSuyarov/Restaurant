document.addEventListener("DOMContentLoaded", () => {
	// -------------------> TABS <-------------

	const tabs = document.querySelectorAll(".tabheader__item"),
		tabContents = document.querySelectorAll(".tab_content"),
		tabParents = document.querySelector(".tabheader__items")

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
	// -------------------> LOADER <-------------

	const loaderWrapper = document.querySelector(".loader-wrapper")

	setTimeout(() => {
		loaderWrapper.style.display = "none"
	}, 1000)

	// -------------------> TIMER <-------------

	const deadline = "2024-09-09"

	function getTimeRemaining(endtime) {
		let days, hours, minutes, seconds
		const time = Date.parse(endtime) - Date.parse(new Date())

		if (time <= 0) {
			days = 0
			hours = 0
			minutes = 0
			seconds = 0
		} else {
			;(days = Math.floor(time / (1000 * 60 * 60 * 24))),
				(hours = Math.floor((time / (1000 * 60 * 60)) % 24)),
				(minutes = Math.floor((time / (1000 * 60)) % 60)),
				(seconds = Math.floor((time / 1000) % 60))
		}

		return {
			totalTime: time,
			days,
			hours,
			minutes,
			seconds,
		}
	}

	function formatNumber(number) {
		if (number >= 0 && number < 10) {
			return `0${number}`
		} else {
			return number
		}
	}
	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector("#days"),
			hours = timer.querySelector("#hours"),
			minutes = timer.querySelector("#minutes"),
			seconds = timer.querySelector("#seconds"),
			timeInterval = setInterval(updateClock, 1000)

		updateClock()

		function updateClock() {
			const time = getTimeRemaining(endtime)
			days.innerHTML = formatNumber(time.days)
			hours.innerHTML = formatNumber(time.hours)
			minutes.innerHTML = formatNumber(time.minutes)
			seconds.innerHTML = formatNumber(time.seconds)
			if (time.totalTime <= 0) {
				clearInterval(timeInterval)
			}
		}
	}
	setClock(".timer", deadline)

	// -------------------> MODAl <-------------

	const modalOpenBtns = document.querySelectorAll("[data-modal]"),
		modal = document.querySelector(".modal"),
		modalCloseBtn = document.querySelector("[data-modal-close]"),
		modalView = document.querySelector(".modal__content")

	function openModal() {
		modalView.classList.add("modal_fade")
		modal.classList.add("show")
		modal.classList.remove("hide")
		document.body.style.overflow = "hidden"
		clearInterval(modalTimerId)
	}
	modalOpenBtns.forEach(btn => {
		btn.addEventListener("click", openModal)
	})

	function closeModal() {
		modal.classList.add("hide")
		modal.classList.add("show")
		document.body.style.overflow = ""
	}
	modalCloseBtn.addEventListener("click", closeModal)

	modal.addEventListener("click", event => {
		if (event.target === modal) {
			closeModal()
		}
	})
	document.addEventListener("keydown", event => {
		if (event.code === "Escape" && modal.classList.contains("show")) {
			closeModal()
		}
	})

	const modalTimerId = setTimeout(openModal, 60000)

	// -------------------> CLASS <-------------

	class OfferMenu {
		constructor(src, alt, title, descr, discount, price, parentSelector) {
			;(this.src = src),
				(this.alt = alt),
				(this.title = title),
				(this.descr = descr),
				(this.discount = discount),
				(this.price = price),
				(this.parent = document.querySelector(parentSelector))
			this.formatToUSD()
		}
		formatToUSD() {
			this.discount = this.discount.toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
			})
			this.price = this.price.toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
			})
		}
		render() {
			const element = document.createElement("div")
			element.innerHTML = `			
			  <img src="${this.src}" alt="${this.alt}">
			  <div>
				<h3>${this.title}</h3>
				<p>${this.descr}</p>
				<p><del>${this.discount}</del> <span class="primary-text">${this.price}</span></p>
			</div>`
			this.parent.append(element)
		}
	}
	const offers = [
		{
			src: "./img/offer1.png",
			alt: "Quattro Pasta",
			title: "Quattro Pasta",
			descr:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.",
			price: 55,
			discount: 23,
		},
		{
			src: "./img/offer2.png",
			alt: "Vegertarian Pasta",
			title: "Vegertarian Pasta",
			descr:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.",
			price: 75,
			discount: 32,
		},
		{
			src: "./img/offer3.png",
			alt: "Gluten-Free Pasta",
			title: "Gluten-Free Pasta",
			descr:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.",
			price: 45,
			discount: 15,
		},
	]
	offers.forEach(offer => {
		// console.log(offer)
		new OfferMenu(
			offer.src,
			offer.alt,
			offer.title,
			offer.descr,
			offer.price,
			offer.discount,
			".offers-items"
		).render()
	})
	// new OfferMenu(
	// 	"./img/offer2.png",
	// 	"Vegertarian Pasta",
	// 	"Vegertarian Pasta",
	// 	"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.",
	// 	75,
	// 	34,
	// 	".offers-items"
	// ).render()
	// new OfferMenu(
	// 	"./img/offer3.png",
	// 	"Gluten-Free Pasta",
	// 	"Gluten-Free Pasta",
	// 	"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.",
	// 	45,
	// 	32,
	// 	".offers-items"
	// ).render()

	class SpecialMenu {
		constructor(src, alt, title, price, descr, parentSelector) {
			;(this.src = src),
				(this.alt = alt),
				(this.title = title),
				(this.price = price),
				(this.descr = descr),
				(this.parent = document.querySelector(parentSelector))
			this.formatToUSD()
		}
		formatToUSD() {
			this.price = this.price.toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
			})
		}
		render() {
			const element = document.createElement("div")
			element.innerHTML = `
			<div class="menu-item">
			  <img src="${this.src}" alt="${this.alt}">
			  <div>
				 <h3>${this.title}<span class="primary-text">${this.price}</span></h3>
				 <p>${this.descr}</p>
			  </div>
			</div>
		  `
			this.parent.append(element)
		}
	}
	const specialMenuLeft = [
		{
			src: "./img/food1.png",
			alt: "LASAL Cheese",
			title: "LASAL CHEESE",
			price: 18,
			descr:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.",
		},
		{
			src: "./img/food2.png",
			alt: "JUMBO CRAB SHRIMP",
			title: "JUMBO CRAB SHRIMP",
			price: 19,
			descr:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.",
		},
		{
			src: "./img/food3.png",
			alt: "KOKTAIL JUCIE",
			title: "KOKTAIL JUCIE",
			price: 20,
			descr:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.",
		},
		{
			src: "./img/food4.png",
			alt: "CAPO STEAK",
			title: "CAPO STEAK",
			price: 21,
			descr:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.",
		},
		{
			src: "./img/food5.png",
			alt: "ORGANIC FRUIT SALAD",
			title: "ORGANIC FRUIT SALAD",
			price: 22,
			descr:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.",
		},
		{
			src: "./img/food6.png",
			alt: "CHEESE PIZZA",
			title: "CHEESE PIZZA",
			price: 23,
			descr:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.",
		},
	]
	specialMenuLeft.forEach(menu => {
		//hello dars 32
		const { src, alt, title, price, descr } = menu
		new SpecialMenu(src, alt, title, price, descr, ".menu-items-left").render()
	})

	// new SpecialMenu(
	// 	"./img/food2.png",
	// 	"JUMBO CRAB SHRIMP",
	// 	"JUMBO CRAB SHRIMP",
	// 	19,
	// 	"Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.",
	// 	".menu-items-left"
	// ).render()
	// new SpecialMenu(
	// 	"./img/food3.png",
	// 	"KOKTAIL JUCIE",
	// 	"KOKTAIL JUCIE",
	// 	20,
	// 	"Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.",
	// 	".menu-items-left"
	// ).render()
	// new SpecialMenu(
	// 	"./img/food4.png",
	// 	"CAPO STEAK",
	// 	"CAPO STEAK",
	// 	21,
	// 	"Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.",
	// 	".menu-items-left"
	// ).render()
	// new SpecialMenu(
	// 	"./img/food5.png",
	// 	"ORGANIC FRUIT SALAD",
	// 	"ORGANIC FRUIT SALAD",
	// 	22,
	// 	"Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.",
	// 	".menu-items-left"
	// ).render()
	// new SpecialMenu(
	// 	"./img/food6.png",
	// 	"CHEESE PIZZA",
	// 	"CHEESE PIZZA",
	// 	23,
	// 	"Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.",
	// 	".menu-items-left"
	// ).render()

	const specialMenuRight = [
		{
			src: "./img/food7.jpeg",
			alt: "KOFTA MEAT",
			title: "KOFTA MEAT",
			price: 24,
			descr:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.",
		},
		{
			src: "./img/food8.jpeg",
			alt: "SPANISH PIES",
			title: "SPANISH PIES",
			price: 25,
			descr:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.",
		},
		{
			src: "./img/food9.jpeg",
			alt: "CHEESE TOST",
			title: "CHEESE TOST",
			price: 26,
			descr:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.",
		},
		{
			src: "./img/food10.jpeg",
			alt: "FRUIT SALAD",
			title: "FRUIT SALAD",
			price: 27,
			descr:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.",
		},
		{
			src: "./img/food11.jpeg",
			alt: "CHICKEN SHAWARMA",
			title: "CHICKEN SHAWARMA",
			price: 28,
			descr:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.",
		},
		{
			src: "./img/food12.jpeg",
			alt: "MEGA CHEESE PIZZA",
			title: "MEGA CHEESE PIZZA",
			price: 29,
			descr:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.",
		},
	]
	specialMenuRight.forEach(menu => {
		const { src, alt, title, price, descr } = menu
		new SpecialMenu(src, alt, title, price, descr, ".menu-items-right").render()
	})
	// new SpecialMenu(
	// 	"./img/food8.jpeg",
	// 	"SPANISH PIES",
	// 	"SPANISH PIES",
	// 	25,
	// 	"Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.",
	// 	".menu-items-right"
	// ).render()
	// new SpecialMenu(
	// 	"./img/food9.jpeg",
	// 	"CHEESE TOST",
	// 	"CHEESE TOST",
	// 	26,
	// 	"Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.",
	// 	".menu-items-right"
	// ).render()
	// new SpecialMenu(
	// 	"./img/food10.jpeg",
	// 	"FRUIT SALAD",
	// 	"FRUIT SALAD",
	// 	27,
	// 	"Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.",
	// 	".menu-items-right"
	// ).render()
	// new SpecialMenu(
	// 	"./img/food11.jpeg",
	// 	"CHICKEN SHAWARMA",
	// 	"CHICKEN SHAWARMA",
	// 	28,
	// 	"Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.",
	// 	".menu-items-right"
	// ).render()
	// new SpecialMenu(
	// 	"./img/food12.jpeg",
	// 	"MEGA CHEESE PIZZA",
	// 	"MEGA CHEESE PIZZA",
	// 	29,
	// 	"Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.",
	// 	".menu-items-right"
	// ).render()

	class DayTime {
		constructor(src, alt, title, time, parentSelector) {
			;(this.src = src),
				(this.alt = alt),
				(this.title = title),
				(this.time = time),
				(this.parent = document.querySelector(parentSelector))
		}
		render() {
			const element = document.createElement("div")
			element.innerHTML = `<div class="daytime-item">
			<img src="${this.src}" alt="${this.alt}">
			<h3>${this.title}</h3>
			<p>${this.time}</p>
		</div>`
			this.parent.append(element)
		}
	}
	const dayTimes = [
		{
			src: "./img/breckfastIcon.png",
			alt: "Breakfast",
			title: "Breakfast",
			time: "8:00 am to 10:00 am",
		},
		{
			src: "./img/lunchIcon.png",
			alt: "Lunch",
			title: "Lunch",
			time: "4:00 pm to 7:00 pm",
		},
		{
			src: "./img/dinnerIcon.png",
			alt: "Dinner",
			title: "Dinner",
			time: "9:00 am to 1:00 am",
		},
		{
			src: "./img/dessertIcon.png",
			alt: "Dessert",
			title: "Dessert",
			time: "All Day",
		},
	]
	dayTimes.forEach(daytimes => {
		// console.log(daytimes)
		const { src, alt, title, time } = daytimes
		new DayTime(src, alt, title, time, ".daytime-items").render()
	})
	// new DayTime(
	// 	"./img/lunchIcon.png",
	// 	"Lunch",
	// 	"Lunch",
	// 	"4:00 pm to 7:00 pm",
	// 	".daytime-items"
	// ).render()
	// new DayTime(
	// 	"./img/dinnerIcon.png",
	// 	"Dinner",
	// 	"Dinner",
	// 	"9:00 pm to 1:00 am",
	// 	".daytime-items"
	// ).render()
	// new DayTime(
	// 	"./img/dessertIcon.png",
	// 	"Dessert",
	// 	"Dessert",
	// 	"All day",
	// 	".daytime-items"
	// ).render()

	// -------------------> FORM <-------------
	const form = document.querySelector("form"),
		telegramTokenBot = "6865151304:AAH89nCH_W4asJrqv9Hf8bP4N5M6efye4jU",
		chatId = "209087908"

	const message = {
		loading: "Loading...",
		success: "Thanks for contacting with us",
		failure: "Something went wrong",
	}

	form.addEventListener("submit", event => {
		event.preventDefault()

		const loader = document.createElement("div")
		loader.classList.add("loader")
		loader.style.width = "20px"
		loader.style.height = "20px"
		loader.style.marginTop = "20px"
		form.append(loader)

		const formData = new FormData(form)

		const object = {}
		formData.forEach((value, key) => {
			object[key] = value
		})

		fetch(`https://api.telegram.org/bot${telegramTokenBot}/sendMessage`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				chat_id: chatId,
				text: `Name: ${object.name}. Phone: ${object.phone}`,
			}),
		})
			.then(() => {
				showStatusMessage(message.success)
				form.reset()
			})
			.catch(() => showStatusMessage(message.failure))
			.finally(() => loader.remove())
	})

	function showStatusMessage(message) {
		const modalDialog = document.querySelector(".modal__dialog")

		modalDialog.classList.add("hide")
		openModal()

		const statusModal = document.createElement("div")
		statusModal.classList.add("modal__dialog")
		statusModal.innerHTML = `
		<div class="modal__content">
			<div data-modal-close class="modal__close">&times;</div>
			<div class="modal__title">${message}</div>
		</div>
	`

		document.querySelector(".modal").append(statusModal)

		setTimeout(() => {
			statusModal.remove()
			modalDialog.classList.remove("hide")
			closeModal()
		}, 4000)
	}

	// const form = document.querySelector("from"),
	// 	telegramTokenBot = "6865151304:AAH89nCH_W4asJrqv9Hf8bP4N5M6efye4jU",
	// 	chatId = "209087908"

	// form.addEventListener("submit", event => {
	// 	event.preventDefault()

	// 	const formData = new FormData(form)

	// 	const object = {}
	// 	formData.forEach((value, key) => {
	// 		object[key] = value
	// 	})
	// 	console.log(object)

	// fetch(`https://api.telegram.org/bot${telegramTokenBot}/sendMessage`, {
	// 	method: "POST",
	// 	headers: { "Content-Type": "application/json" },
	// 	body: JSON.stringify({
	// 		chat_id: chatId,
	// 		text: `Name: ${object.name}. Phone: ${object.phone}`,
	// 	}),
	// })
})
