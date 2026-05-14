const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const TOKEN_KEY = 'kf_admin_token'

export function getToken() {
	return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
	if (token) {
		localStorage.setItem(TOKEN_KEY, token)
	} else {
		localStorage.removeItem(TOKEN_KEY)
	}
}

async function request(path, { method = 'GET', body, auth = false } = {}) {
	const headers = { 'Content-Type': 'application/json' }
	if (auth) {
		const token = getToken()
		if (token) headers.Authorization = `Bearer ${token}`
	}

	const res = await fetch(`${API_URL}${path}`, {
		method,
		headers,
		body: body ? JSON.stringify(body) : undefined,
	})

	if (res.status === 204) return null

	let data = null
	const text = await res.text()
	if (text) {
		try {
			data = JSON.parse(text)
		} catch {
			data = text
		}
	}

	if (!res.ok) {
		const message = (data && data.message) || (typeof data === 'string' && data) || `Błąd ${res.status}`
		const err = new Error(message)
		err.status = res.status
		throw err
	}

	return data
}

export const getFirmy = (search, kategoriaId) => {
	const params = new URLSearchParams()
	if (search) params.set('search', search)
	if (kategoriaId) params.set('kategoriaId', kategoriaId)
	const qs = params.toString()
	return request(`/api/firmy${qs ? `?${qs}` : ''}`)
}

export const getKategorie = () => request('/api/kategorie')

export const login = (username, password) =>
	request('/api/auth/login', { method: 'POST', body: { username, password } })

export const me = () => request('/api/auth/me', { auth: true })

export const createFirma = data => request('/api/firmy', { method: 'POST', body: data, auth: true })

export const updateFirma = (id, data) =>
	request(`/api/firmy/${id}`, { method: 'PUT', body: data, auth: true })

export const deleteFirma = id => request(`/api/firmy/${id}`, { method: 'DELETE', auth: true })
