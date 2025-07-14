import { writable, derived } from 'svelte/store'

export const user = writable(null)

export const userLoggedIn = derived(user, ($user) => !!$user)
export const isAdmin = derived(user, ($user) => $user?.isAdmin === true)

export const freeTrialExpired = derived(user, ($user) => {
	if (!$user || !$user.createdAt) return false

	const createdAtDate = new Date($user.createdAt)
	const currentDate = new Date()
	const trialPeriod = 14 * 24 * 60 * 60 * 1000

	return currentDate - createdAtDate > trialPeriod
})

export function setUser(data) {
	user.set(data)
}
