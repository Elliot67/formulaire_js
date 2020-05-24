import togglePassword from '@src/js/togglePasswordVisibility.js';

new togglePassword(document.querySelector('#password'), document.querySelector('#passwordToggle'));

let page = 1;

const data = {
	"firstPage": undefined,
	"secondPage": undefined,
};

const onLoginFormSubmit = e => {
	e.preventDefault();
	if (page === 1) {
		// TODO: Passer en étape 2
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
};

const changePage = page => {
	const page1 = document.querySelector('.page1');
	const page2 = document.querySelector('.page2');
	console.log('go to page : ', page);
	if (page === 1) {
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
	console.log('trigger errors');
	document.querySelector('#formButtonContinue').click();
}

document.querySelector('#toPage2').addEventListener('click', triggerVerification);
document.querySelector('#toPage1').addEventListener('click', () => changePage(1));

document.querySelector('form').addEventListener('submit', onLoginFormSubmit);