import { isMobile, deviceType } from '$lib/stores/generalStore'
import { user } from '$lib/stores/user'
import { goto } from '$app/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '$lib/firebase'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export let lookup
const loadChordScales = async () => {
	const result = await fetch('/chordScaleLookup.json')
	lookup = await result.json()
}
function getDeviceType() {
	const ua = navigator.userAgent

	if (/iPhone/i.test(ua)) return 'iPhone'
	if (/iPad/i.test(ua)) return 'iPad'
	if (/Android/i.test(ua)) return 'Android'
	if (/Windows Phone/i.test(ua)) return 'Windows Phone'
	if (/Windows NT/i.test(ua)) return 'Windows'
	if (/Macintosh/i.test(ua)) return 'Mac'
	if (/Linux/i.test(ua)) return 'Linux'

	return 'Unknown'
}

export const onAuthStateChange = () => {
	const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
		if (firebaseUser) {
			if (!firebaseUser.emailVerified) return goto('/auth/verify-email')
			const localUser = JSON.parse(window.localStorage.getItem('user'))
			if (!localUser) {
				const token = await firebaseUser.getIdToken()
				const res = await fetch(`${API_BASE_URL}/api/users`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				})
				if (!res.ok) throw new Error('Failed to verify token')
				const appUser = await res.json()
				window.localStorage.setItem('user', JSON.stringify(appUser))
				user.set(appUser)
			} else {
				user.set(localUser)
			}
		} else {
			user.set(null)
			window.localStorage?.setItem('user', null)
			goto('/')
		}
	})
}

export const init = () => {
	deviceType.set(getDeviceType())
	isMobile.set(/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent))
	loadChordScales()
	onAuthStateChange()
}
