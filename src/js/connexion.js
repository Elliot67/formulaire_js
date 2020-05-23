import togglePassword from '@src/js/togglePasswordVisibility.js';

const email = "hello@lp.wd";
const password = "password";

new togglePassword(document.querySelector('#password'), document.querySelector('#passwordToggle'));

const onLoginFormSubmit = e => {
	e.preventDefault();
	startPendingState();
	setTimeout(() => {
		stopPendingState();
		const data = new FormData(e.target);
		console.log(data);
		if (data.get('password') === password && data.get('email') === email) {
			handleSuccessMessage();
		} else {
			handleErrorMessage();
		}
	}, 2000);
};

const handleErrorMessage = () => {
	console.log('je suis là');
	//document.querySelector('#errorBlock').classList.remove('hidden');
};

const handleSuccessMessage = () => {
	window.location.replace(window.location.href);
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

document.querySelector('form').addEventListener('submit', onLoginFormSubmit);