import {
	getAuth,
	setPersistence,
	signInWithEmailAndPassword,
	browserLocalPersistence
} from 'firebase/auth'

const auth = getAuth()

export const handleSignIn = async (email, password) => {
	try {
		await setPersistence(auth, browserLocalPersistence)
		const userCredential = await signInWithEmailAndPassword(auth, email, password)
		return userCredential.user
	} catch (error) {
		console.error('Sign-in error:', error.code, error.message)
		throw error
	}
}
