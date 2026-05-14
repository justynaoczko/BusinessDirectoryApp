import React, { useState } from 'react'
import { login, setToken } from './api'

function AdminLogin({ onLoggedIn, onCancel }) {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	async function handleSubmit(e) {
		e.preventDefault()
		setError(null)
		setLoading(true)
		try {
			const res = await login(username, password)
			setToken(res.token)
			onLoggedIn(res.username)
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='min-h-screen bg-gray-50 flex items-center justify-center p-6'>
			<form
				onSubmit={handleSubmit}
				className='w-full max-w-md bg-white rounded-3xl shadow-sm border border-slate-200 p-8 space-y-5'>
				<h1 className='text-3xl font-bold text-slate-900'>Logowanie administratora</h1>
				<p className='text-sm text-slate-500'>
					Domyślne dane: <code className='bg-slate-100 px-1 rounded'>admin</code> /{' '}
					<code className='bg-slate-100 px-1 rounded'>admin123</code>
				</p>

				<div>
					<label className='block text-sm font-medium text-slate-700 mb-1'>Login</label>
					<input
						type='text'
						value={username}
						onChange={e => setUsername(e.target.value)}
						className='w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none'
						required
					/>
				</div>

				<div>
					<label className='block text-sm font-medium text-slate-700 mb-1'>Hasło</label>
					<input
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						className='w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none'
						required
					/>
				</div>

				{error && (
					<div className='p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm'>{error}</div>
				)}

				<div className='flex gap-3 pt-2'>
					<button
						type='button'
						onClick={onCancel}
						className='flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50'>
						Anuluj
					</button>
					<button
						type='submit'
						disabled={loading}
						className='flex-1 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-blue-600 disabled:opacity-50'>
						{loading ? 'Logowanie...' : 'Zaloguj'}
					</button>
				</div>
			</form>
		</div>
	)
}

export default AdminLogin
