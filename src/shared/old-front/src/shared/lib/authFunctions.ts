export function validateEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validatePass(pass: string): boolean {
	return pass.length >= 8
}


