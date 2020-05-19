import eyeClose from "@assets/eye-close.svg";
import eyeOpen from "@assets/eye-open.svg";

class TogglePasswordVisibilty {

	constructor(input, image) {
		this.isPasswordVisible = false;
		this.image = image;
		this.input = input;

		this.image.addEventListener('click', this.togglePassword.bind(this));
	}

	togglePassword() {
		if (!this.isPasswordVisible) {
			this.isPasswordVisible = true;
			this.image.setAttribute('src', eyeOpen);
			this.input.setAttribute('type', 'text');
		} else {
			this.isPasswordVisible = false;
			this.image.setAttribute('src', eyeClose);
			this.input.setAttribute('type', 'password');
		}
	}
}

export default TogglePasswordVisibilty;