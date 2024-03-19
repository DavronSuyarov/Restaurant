function classes(selector) {
	class OfferMenu {
		constructor(src, alt, title, descr, discount, price, parentSelector) {
			this.src = src
			this.alt = alt
			this.title = title
			this.descr = descr
			this.discount = discount
			this.price = price
			this.parent = document.querySelector(parentSelector)
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
					selector
				).render()
			})
		})

	class SpecialMenu {
		constructor(src, alt, title, price, descr, parentSelector) {
			this.src = src
			this.alt = alt
			this.title = title
			this.price = price
			this.descr = descr
			this.parent = document.querySelector(parentSelector)
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
			this.src = src
			this.alt = alt
			this.title = title
			this.time = time
			this.parent = document.querySelector(parentSelector)
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
}

export default classes
