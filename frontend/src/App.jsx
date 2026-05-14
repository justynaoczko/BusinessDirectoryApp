import React, { useEffect, useState } from 'react'
import PublicView from './PublicView'
import AdminLogin from './AdminLogin'
import AdminPanel from './AdminPanel'
import { getToken, me, setToken } from './api'

function App() {
	const [view, setView] = useState('public')
	const [username, setUsername] = useState(null)

	useEffect(() => {
		if (!getToken()) return
		me()
			.then(data => setUsername(data.username))
			.catch(() => setToken(null))
	}, [])

	if (view === 'login') {
		return (
			<AdminLogin
				onLoggedIn={name => {
					setUsername(name)
					setView('admin')
				}}
				onCancel={() => setView('public')}
			/>
		)
	}

	if (view === 'admin') {
		if (!username) {
			return (
				<AdminLogin
					onLoggedIn={name => {
						setUsername(name)
					}}
					onCancel={() => setView('public')}
				/>
			)
		}
		return (
			<AdminPanel
				username={username}
				onLogout={() => {
					setUsername(null)
					setView('public')
				}}
				onBack={() => setView('public')}
			/>
		)
	}

	return (
		<PublicView
			onAdminClick={() => setView(username ? 'admin' : 'login')}
		/>
	)
}

export default App
