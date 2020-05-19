const email = "hello@lp.wd";
const password = "password";

const onLoginFormSubmit = e => {
	e.preventDefault();
	startPendingState();

	setTimeout(() => {
		stopPendingState();
		const data = new FormData(e.target);
		console.log(data);
		processForm(data);
	}, 2000);
}

const processForm = data => {
	if (data.get('password') === password && data.get('email') === email) {
		handleSuccessMessage();
	} else {
		handleErrorMessage();
	}
};

const handleErrorMessage = () => {
	console.log('je suis là');
	//document.querySelector('#errorBlock').classList.remove('hidden');
}

const handleSuccessMessage = () => {
	window.location.replace(window.location.href);
}

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