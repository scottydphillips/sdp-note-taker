class MakeCard {
	constructor(id, title, message) {
		this.id = id;
		this.title = title;
		this.message = message;
	}
}

const mainCard = document.getElementById("note-title")
const ulEl = document.getElementById("side-list")
const saveBtn = document.getElementById("save-btn")
const newNoteBtn = document.getElementById("new-note")

createMainCard = () => {
	mainCard.appendChild(
`<h2>${this.title}</h2>
<h4>${this.message}</h4>`)
}

createSideCard = () => {
	fetch('../api/notes')
	.then(ulEl.appendChild(
`<li class="list-group-item">
<h4>${this.title}</h4>`
	))}

saveBtn.addEventListener("click", createMainCard())
