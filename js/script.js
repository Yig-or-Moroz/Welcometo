"use strict"

const allCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
						22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 
						42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61,
						62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81];

const allPlansCards = [[1, 3, 5, 7, 9, 11],
							[13, 15, 17, 19, 21, 23],
							[25, 27, 29, 31, 33, 35]];

const topNumberDeck = document.querySelector('.top-deck');
const centerNumberDeck = document.querySelector('.center-deck');
const bottomNumberDeck = document.querySelector('.bottom-deck');

const topDiscardDeck = document.querySelector('.top-discard');
const centerDiscardDeck = document.querySelector('.center-discard');
const bottomDiscardDeck = document.querySelector('.bottom-discard');

const buildingPlans = document.querySelector('.building-plans');
const popUp = document.querySelector('.popup');
const popupContent = document.querySelector('.popup-content')
const popupContentText = document.querySelector('.popup-content__text');

const topPlansCardFront = document.querySelectorAll('.front')[0];
const topPlansCardBack = document.querySelectorAll('.back')[0];
const centerPlansCardFront = document.querySelectorAll('.front')[1];
const centerPlansCardBack = document.querySelectorAll('.back')[1];
const bottomPlansCardFront = document.querySelectorAll('.front')[2];
const bottomPlansCardBack = document.querySelectorAll('.back')[2];

const playButton = document.querySelector('.play');
const backButton = document.querySelector('.back-arrow');
const mixButton = document.querySelector('.mix');
const nextButton = document.querySelector('.next-button');

let firstDeck = [];
let secondDeck = [];
let thirdDeck = [];


function shuffleCards(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}

	return array;
}

function plansLayout(array) {
	let topPlan = shuffleCards(array[0]);
	let centerPlan = shuffleCards(array[1]);
	let bottomPlan = shuffleCards(array[2]);

	topPlansCardFront.style.backgroundImage = `url(image/plans/${topPlan[0]}.jpg)`;
	topPlansCardFront.style.backgroundSize = `cover`;
	topPlansCardBack.style.backgroundImage = `url(image/plans/${topPlan[0] + 1}.jpg)`;
	topPlansCardBack.style.backgroundSize = `cover`;

	centerPlansCardFront.style.backgroundImage = `url(image/plans/${centerPlan[0]}.jpg)`;
	centerPlansCardFront.style.backgroundSize = `cover`;
	centerPlansCardBack.style.backgroundImage = `url(image/plans/${centerPlan[0] + 1}.jpg)`;
	centerPlansCardBack.style.backgroundSize = `cover`;

	bottomPlansCardFront.style.backgroundImage = `url(image/plans/${bottomPlan[0]}.jpg)`;
	bottomPlansCardFront.style.backgroundSize = `cover`;
	bottomPlansCardBack.style.backgroundImage = `url(image/plans/${bottomPlan[0] + 1}.jpg)`;
	bottomPlansCardBack.style.backgroundSize = `cover`;
}

function initialLayout(array) {
	shuffleCards(array);
	
	firstDeck = array.slice(0, 27);
	secondDeck = array.slice(27, 54);
	thirdDeck = array.slice(54, 81);

	playingNumbersCards(firstDeck, topNumberDeck, topDiscardDeck);
	playingNumbersCards(secondDeck, centerNumberDeck, centerDiscardDeck);
	playingNumbersCards(thirdDeck, bottomNumberDeck, bottomDiscardDeck);
}


function playingNumbersCards(deck, numberPlace, efectPlace) {
	
	let efect = deck.pop();

	if (efect > 0 && efect < 19) {
			efectPlace.style.backgroundImage = "url(image/cards/fence.jpg)";
		} else if (efect > 18 && efect < 37) {
			efectPlace.style.backgroundImage = "url(image/cards/agent.jpg)";
		} else if (efect > 36 && efect < 55) {
			efectPlace.style.backgroundImage = "url(image/cards/square.jpg)";
		} else if (efect > 54 && efect < 64) {
			efectPlace.style.backgroundImage = "url(image/cards/pool.jpg)";
		} else if (efect > 63 && efect < 73) {
			efectPlace.style.backgroundImage = "url(image/cards/workers.jpg)";
		} else if (efect > 72 && efect < 82) {
			efectPlace.style.backgroundImage = "url(image/cards/mailbox.jpg)";
		} else {
			efectPlace.style.backgroundImage = "url(image/cards/0.jpg)";
	}
	
	numberPlace.style.backgroundImage = `url(image/cards/${deck[deck.length - 1]}.jpg)`;
}

function flipPlanCard(front, back) {
	front.style.transform = 'perspective(600px) rotateY(180deg)';
	back.style.transform = 'perspective(600px) rotateY(0)';
}

playButton.addEventListener('click', () => {
	initialLayout(allCards);
	plansLayout(allPlansCards);
})

mixButton.addEventListener('click', () => {
	initialLayout(allCards);
})

nextButton.addEventListener('click', () => {

	playingNumbersCards(firstDeck, topNumberDeck, topDiscardDeck);
	playingNumbersCards(secondDeck, centerNumberDeck, centerDiscardDeck);
	playingNumbersCards(thirdDeck, bottomNumberDeck, bottomDiscardDeck);

	if (firstDeck.length < 1) {
		initialLayout(allCards);
	}
})

buildingPlans.addEventListener('click', event => {
	let plan = event.target;
	let firstDeck = false;
	let secondDeck = false;
	let thirdDeck = false;

	if (!plan.classList.contains('front')) return;
	if (plan.parentElement.classList.contains('top-card')) firstDeck = true;
	if (plan.parentElement.classList.contains('center-card')) secondDeck = true;
	if (plan.parentElement.classList.contains('bottom-card')) thirdDeck = true;
	
	popupContentText.innerHTML = 'Are you the first one to complete the building plan and want to flip the card?'
	popUp.style.visibility = "visible";

	popUp.addEventListener('click', event => {
		event.preventDefault();
		let button = event.target;

		if (button.classList.contains('yes')) {
			popUp.style.visibility = "hidden"
			if (firstDeck) {
				flipPlanCard(topPlansCardFront, topPlansCardBack);
			} else if (secondDeck) {
				flipPlanCard(centerPlansCardFront, centerPlansCardBack);
			} else if (thirdDeck) {
				flipPlanCard(bottomPlansCardFront, bottomPlansCardBack);
			} 
		}

		if (button.classList.contains('no') || button.classList.contains('popup-background__dark')) {
			firstDeck = false;
			secondDeck = false;
			thirdDeck = false;
			popUp.style.visibility = "hidden";
		}
	})

})


let winH = document.documentElement.clientHeight;
let winW = document.documentElement.clientWidth;

console.log(winH);
console.log(winW);


