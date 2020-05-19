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
	//const loading = document.querySelector('#loading');

	button.setAttribute('disabled', '');
	//loading.classList.remove('hidden');
};

const stopPendingState = () => {
	const button = document.querySelector('#formButton');
	//const loading = document.querySelector('#loading');

	button.removeAttribute('disabled');
	//loading.classList.add('hidden');
};

document.querySelector('form').addEventListener('submit', onLoginFormSubmit);