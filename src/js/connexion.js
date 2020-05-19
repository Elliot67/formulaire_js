import eyeClose from "@assets/eye-close.svg";
import eyeOpen from "@assets/eye-open.svg";

const email = "hello@lp.wd";
const password = "password";

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


// Gestion toggle Password
let isPasswordVisible = false;
const togglePassword = () => {
	const toggle = document.querySelector('#passwordToggle');
	const input = document.querySelector('#password');

	if (!isPasswordVisible) {
		isPasswordVisible = true;
		toggle.setAttribute('src', eyeOpen);
		input.setAttribute('type', 'text');
	} else {
		isPasswordVisible = false;
		toggle.setAttribute('src', eyeClose);
		input.setAttribute('type', 'password');
	}
}
document.querySelector('#passwordToggle').addEventListener('click', togglePassword);