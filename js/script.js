"use stcict"

window.addEventListener("DOMContentLoaded", () => {
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

	modal.addEventListener("click", event => {
		if (
			event.target === modal ||
			event.target.getAttribute("data-modal-close") === ""
		) {
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
	fetch("http://localhost:3000/offers", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	})
		.then(response => response.json())
		.then(data => {
			data.forEach(offer => {
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
		})

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
	fetch("http://localhost:3000/specialMenuLeft", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	})
		.then(response => response.json())
		.then(data => {
			data.forEach(menu => {
				//hello dars 32
				const { src, alt, title, price, descr } = menu
				new SpecialMenu(
					src,
					alt,
					title,
					price,
					descr,
					".menu-items-left"
				).render()
			})
		})

	fetch("http://localhost:3000/specialMenuRight", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	})
		.then(response => response.json())
		.then(data => {
			data.forEach(menu => {
				const { src, alt, title, price, descr } = menu
				new SpecialMenu(
					src,
					alt,
					title,
					price,
					descr,
					".menu-items-right"
				).render()
			})
		})

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
	fetch("http://localhost:3000/dayTimes", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	})
		.then(response => response.json())
		.then(data => {
			data.forEach(daytimes => {
				// console.log(daytimes)
				const { src, alt, title, time } = daytimes
				new DayTime(src, alt, title, time, ".daytime-items").render()
			})
		})

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

	// -------------------> SLIDER <-------------

	const slides = document.querySelectorAll(".offer__slide"),
		prev = document.querySelector(".offer__slider-prev"),
		next = document.querySelector(".offer__slider-next"),
		total = document.querySelector("#total"),
		current = document.querySelector("#current"),
		slidesWrapper = document.querySelector(".offer__slider-wrapper"),
		slidesInner = document.querySelector(".offer__slider_inner"),
		width = window.getComputedStyle(slidesWrapper).width

	console.log(width)

	let slideIndex = 1,
		offset = 0

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`
		current.textContent = `0${slideIndex}`
	} else {
		total.textContent = slides.length
		current.textContent = slideIndex
	}

	slidesInner.style.width = 100 * slides.length + "%"
	slidesInner.style.display = "flex"
	slidesInner.style.transition = "all .5s ease"
	slidesWrapper.style.overflow = "hidden"

	slides.forEach(slide => {
		slide.style.width = width
	})

	next.addEventListener("click", () => {
		if (offset === +width.replace(/\D/g, "") * (slides.length - 1)) {
			offset = 0
		} else {
			offset += +width.replace(/\D/g, "")
		}
		slidesInner.style.transform = `translateX(-${offset}px)`

		if (slideIndex === slides.length) {
			slideIndex = 1
		} else {
			slideIndex++
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`
		} else {
			current.textContent = slideIndex
		}
	})

	prev.addEventListener("click", () => {
		if (offset === 0) {
			offset = +width.replace(/\D/g, "") * (slides.length - 1)
		} else {
			offset -= +width.replace(/\D/g, "")
		}
		slidesInner.style.transform = `translateX(-${offset}px)`

		if (slideIndex === 1) {
			slideIndex = slides.length
		} else {
			slideIndex--
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`
		} else {
			current.textContent = slideIndex
		}
	})

	// showSlides(slideIndex)

	// function showSlides(index) {
	// 	if (index > slides.length) {
	// 		slideIndex = 1
	// 	}
	// 	if (index < 1) {
	// 		slideIndex = slides.length
	// 	}
	// 	slides.forEach(slide => (slide.style.display = "none"))

	// 	slides[slideIndex - 1].style.display = "block"
	//
	// }

	// function moveSlides(index) {
	// 	showSlides((slideIndex += index))
	// }

	// prev.addEventListener("click", () => {
	// 	moveSlides(-1)
	// })

	// next.addEventListener("click", () => {
	// 	moveSlides(+1)
	// })
})
