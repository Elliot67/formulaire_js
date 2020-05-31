import togglePassword from '@src/js/togglePasswordVisibility.js';

new togglePassword(document.querySelector('#password'), document.querySelector('#passwordToggle'));

/* Initialisation champs date */
const date = document.querySelector("#date");
const today = new Date();
const month = ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1);
const day = (today.getDate() < 10 ? '0' : '') + today.getDate();
date.setAttribute('max', today.getFullYear() + '-' + month + '-' + day);

/* Gestion des pages */
let page = 1;

const data = {
	"firstPage": undefined,
	"secondPage": undefined,
};

const onLoginFormSubmit = e => {
	e.preventDefault();
	if (page === 1) {
		data.firstPage = new FormData(e.target);
		changePage(2);
	} else {
		data.secondPage = new FormData(e.target);
		startPendingState();
		setTimeout(() => {
			stopPendingState();
		}, 4000);
	}
};

const startPendingState = () => {
	const button = document.querySelector('#formButton');
	button.setAttribute('disabled', '');
	button.classList.add('loading');
};

const stopPendingState = () => {
	const button = document.querySelector('#formButton');
	button.removeAttribute('disabled');
	button.classList.remove('loading');
	setTimeout(() => { // le timeout pour le fun uniquemebt
		window.location.replace(window.location.href);
	}, 500);
};

const changePage = directionPage => {
	const page1 = document.querySelector('.page1');
	const page2 = document.querySelector('.page2');
	if (directionPage === 1) {
		page2.classList.add('hiddenForm');
		page1.classList.remove('hiddenForm');
		page = 1;
	} else {
		page1.classList.add('hiddenForm');
		page2.classList.remove('hiddenForm');
		page = 2;
	}
}

const triggerVerification = () => {
	document.querySelector('#formButtonContinue').click();
}

document.querySelector('#toPage2').addEventListener('click', triggerVerification);
document.querySelector('#toPage1').addEventListener('click', () => changePage(1));

const forms = document.querySelectorAll('form');
forms[0].addEventListener('submit', onLoginFormSubmit);
forms[1].addEventListener('submit', onLoginFormSubmit);