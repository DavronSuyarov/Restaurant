import { closeModal, openModal } from "./modal"

function form(formSelector, modalTimerId) {
	const form = document.querySelector(formSelector),
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
		openModal(".modal", ".modal__content", modalTimerId)

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
			closeModal(".modal")
		}, 4000)
	}
}

export default form
