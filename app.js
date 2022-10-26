const reset = document.querySelector("#reset")
const form = document.querySelector("form")
const input = document.querySelector("#user-input")
const hint = document.querySelector("#hint")
const row = document.querySelector("#hintNumbers")
const wrong = document.querySelector("#wrong")
const msg = document.querySelector("#message")

let answer = generateRandomNumber()
console.log("Answer: " + answer)
let count = 0

reset.addEventListener("click", resetPage)
hint.addEventListener("click", getHint)

form.addEventListener("submit", (event) => {
	event.preventDefault()
	console.log(input.value)
	let inputNum = Number(input.value)
	if(inputNum < 1 || inputNum > 100 || isNaN(inputNum)) {
		alert(`${inputNum} is invalid input`)
		input.value = ""
		return
	}
	count += 1
	let guess_i = "#guess" + count
	let arrow_i = "#arrow" + count
	let current_guess = document.querySelector(guess_i)
	let current_arrow = document.querySelector(arrow_i)

	if(count < 5) {
		guess(inputNum, current_guess, current_arrow)
	} else if(count == 5) {
		lastGuess(inputNum, current_guess)
	} else {
		alert("You are out of rounds! Please retry")
	}
	input.value = ""
	msg.value = ""
})

function guess(inputNumber, guessIndex, arrowIndex) {
	guessIndex.textContent = inputNumber

	if(inputNumber == answer) {
		msg.textContent = "You Win"
		guessIndex.style.backgroundColor = "lightgreen"
		resetPage
	}
	else if(inputNumber < answer) {
		console.log("low")
		arrowIndex.textContent = "↓"
	} else {
		console.log("high")
		arrowIndex.textContent = "↑"
	}
}

function lastGuess(inputNumber, guessIndex) {
	guessIndex.textContent = inputNumber
	if(inputNumber == answer) {
		console.log("Correct")
		msg.textContent = "You Win"
		guessIndex.style.backgroundColor = "lightgreen"
	} else {
		console.log("Wrong Number!")
		msg.textContent = "You Lose"
		guessIndex.style.backgroundColor = "red"
	}
}

function resetPage() {
	document.location.reload(true)
}

function generateRandomNumber() {
	return Math.floor(Math.random() * 101) + 1
}

function getHint() {
	for(i = 0; i < 6; i++) {
		let hintNum = document.createElement("div")
		let n = Math.floor(Math.random() * 101) + 1
		hintNum.textContent = n
		row.append(hintNum)
	}
}
