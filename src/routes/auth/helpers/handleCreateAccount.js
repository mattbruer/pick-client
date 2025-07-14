import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'

const auth = getAuth()

export const handleCreateAccount = async (email, password) => {
	try {
		const user = await createUserWithEmailAndPassword(auth, email, password)
		sendEmailVerification(user.user, { url: 'http://localhost:5173', handleCodeInApp: false })
		alert('check yer email buddy')
		// const response = await axios.post('http://localhost:3000/api/users/new', user)
		// window.localStorage.setItem('user', JSON.stringify(response.data))
	} catch (error) {
		console.log('error', error)
	}
}
