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
let win = false

reset.addEventListener("click", resetPage)
hint.addEventListener("click", getHint, {once : true})

form.addEventListener("submit", (event) => {
	event.preventDefault()
	console.log(input.value)
	let inputNum = Number(input.value)
	if(inputNum < 1 || inputNum > 100 || isNaN(inputNum)) {
		alert(`${inputNum} is invalid input`)
		//msg.textContent = "invalid"
		input.value = ""
		return
	}
	count += 1
	let guess_i = "#guess" + count
	let arrow_i = "#arrow" + count
	let current_guess = document.querySelector(guess_i)
	let current_arrow = document.querySelector(arrow_i)

	if (win == true) {
		alert("You already guessed the correct number! Please click Reset to restart the game")
	} else {
		if(count < 5) {
			guess(inputNum, current_guess, current_arrow)
		} else if(count == 5) {
			lastGuess(inputNum, current_guess)
		} else {
			alert("You are out of rounds! Please click Reset and retry")
		}
	}
	input.value = ""
	msg.value = ""
})

function guess(inputNumber, guessIndex, arrowIndex) {
	guessIndex.textContent = inputNumber
	if(inputNumber == answer) {
		msg.textContent = "You Win!"
		guessIndex.style.backgroundColor = "lightgreen"
		//resetPage
		win = true

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
		msg.textContent = "You Win!"
		guessIndex.style.backgroundColor = "lightgreen"
	} else {
		console.log("Wrong Number!")
		msg.textContent = "You Lose!"
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
	row.value = ""
	for(i = 0; i < 6; i++) {
		let hintNum = document.createElement("p")
		let n = Math.floor(Math.random() * 101) + 1
		hintNum.textContent = `${n} \0`
		row.append(hintNum)
	}
}
