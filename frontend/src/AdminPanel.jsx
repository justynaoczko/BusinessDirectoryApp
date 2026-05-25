import React, { useEffect, useState } from 'react'
import { createFirma, deleteFirma, getFirmy, getKategorie, setToken, updateFirma } from './api'

const emptyForm = {
	nazwa: '',
	opis: '',
	adres: '',
	telefon: '',
	email: '',
	strona: '',
	kategoriaId: '',
}

function AdminPanel({ username, onLogout, onBack }) {
	const [firmy, setFirmy] = useState([])
	const [kategorie, setKategorie] = useState([])
	const [editingId, setEditingId] = useState(null)
	const [form, setForm] = useState(emptyForm)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	async function refresh() {
		setLoading(true)
		try {
			const [f, k] = await Promise.all([getFirmy(), getKategorie()])
			setFirmy(f)
			setKategorie(k)
		} catch (e) {
			setError(e.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		refresh()
	}, [])

	function startNew() {
		setEditingId(null)
		setForm({ ...emptyForm, kategoriaId: kategorie[0]?.id || '' })
	}

	function startEdit(firma) {
		setEditingId(firma.id)
		setForm({
			nazwa: firma.nazwa,
			opis: firma.opis,
			adres: firma.adres || '',
			telefon: firma.telefon || '',
			email: firma.email || '',
			strona: firma.strona || '',
			kategoriaId: firma.kategoriaId,
		})
	}

	async function handleSubmit(e) {
		e.preventDefault()
		setError(null)
		const payload = {
			nazwa: form.nazwa,
			opis: form.opis,
			adres: form.adres || null,
			telefon: form.telefon || null,
			email: form.email || null,
			strona: form.strona || null,
			kategoriaId: Number(form.kategoriaId),
		}
		try {
			if (editingId) {
				await updateFirma(editingId, payload)
			} else {
				await createFirma(payload)
			}
			setForm(emptyForm)
			setEditingId(null)
			await refresh()
		} catch (e) {
			setError(e.message)
		}
	}

	async function handleDelete(id) {
		if (!confirm('Na pewno usunąć tę firmę?')) return
		setError(null)
		try {
			await deleteFirma(id)
			await refresh()
		} catch (e) {
			setError(e.message)
		}
	}

	function handleLogout() {
		setToken(null)
		onLogout()
	}

	return (
		<div className='min-h-screen bg-gray-50 p-6 md:p-12'>
			<div className='max-w-6xl mx-auto'>
				<header className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
					<div>
						<h1 className='text-3xl font-extrabold text-slate-900'>Panel administracyjny</h1>
						<p className='text-slate-500 text-sm'>
							Zalogowany jako <strong>{username}</strong>
						</p>
					</div>
					<div className='flex gap-2'>
						<button onClick={onBack} className='px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100'>
							Wróć do katalogu
						</button>
						<button onClick={handleLogout} className='px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-red-600'>
							Wyloguj
						</button>
					</div>
				</header>

				{error && (
					<div className='mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm'>{error}</div>
				)}

				{/* Formularz */}
				<section className='bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8'>
					<div className='flex justify-between items-center mb-4'>
						<h2 className='text-xl font-bold text-slate-800'>
							{editingId ? `Edycja firmy #${editingId}` : 'Dodaj nową firmę'}
						</h2>
						{editingId && (
							<button onClick={startNew} className='text-sm text-blue-600 hover:underline'>
								Anuluj edycję
							</button>
						)}
					</div>
					<form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<input
							required
							placeholder='Nazwa firmy *'
							value={form.nazwa}
							onChange={e => setForm({ ...form, nazwa: e.target.value })}
							className='px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none'
						/>
						<select
							required
							value={form.kategoriaId}
							onChange={e => setForm({ ...form, kategoriaId: e.target.value })}
							className='px-4 py-2 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none'>
							<option value=''>-- wybierz kategorię --</option>
							{kategorie.map(k => (
								<option key={k.id} value={k.id}>
									{k.nazwa}
								</option>
							))}
						</select>
						<textarea
							required
							placeholder='Opis *'
							rows={3}
							value={form.opis}
							onChange={e => setForm({ ...form, opis: e.target.value })}
							className='md:col-span-2 px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none'
						/>
						<input
							placeholder='Adres'
							value={form.adres}
							onChange={e => setForm({ ...form, adres: e.target.value })}
							className='px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none'
						/>
						<input
							placeholder='Telefon'
							value={form.telefon}
							onChange={e => setForm({ ...form, telefon: e.target.value })}
							className='px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none'
						/>
						<input
							type='email'
							placeholder='Email'
							value={form.email}
							onChange={e => setForm({ ...form, email: e.target.value })}
							className='px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none'
						/>
						<input
							placeholder='Strona WWW (https://...)'
							value={form.strona}
							onChange={e => setForm({ ...form, strona: e.target.value })}
							className='px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none'
						/>
						<button
							type='submit'
							className='md:col-span-2 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-blue-600'>
							{editingId ? 'Zapisz zmiany' : 'Dodaj firmę'}
						</button>
					</form>
				</section>

				{/* Lista */}
				<section>
					<h2 className='text-xl font-bold text-slate-800 mb-4'>
						Lista firm {loading && <span className='text-sm text-slate-400'>(ładowanie...)</span>}
					</h2>
					<div className='bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden'>
						<table className='w-full text-sm'>
							<thead className='bg-slate-50 text-slate-600 uppercase text-xs'>
								<tr>
									<th className='text-left px-4 py-3'>ID</th>
									<th className='text-left px-4 py-3'>Nazwa</th>
									<th className='text-left px-4 py-3'>Kategoria</th>
									<th className='text-left px-4 py-3'>Telefon</th>
									<th className='text-right px-4 py-3'>Akcje</th>
								</tr>
							</thead>
							<tbody>
								{firmy.map(f => (
									<tr key={f.id} className='border-t border-slate-100'>
										<td className='px-4 py-3 text-slate-500'>{f.id}</td>
										<td className='px-4 py-3 font-semibold text-slate-800'>{f.nazwa}</td>
										<td className='px-4 py-3'>{f.kategoriaNazwa}</td>
										<td className='px-4 py-3 text-slate-500'>{f.telefon || '—'}</td>
										<td className='px-4 py-3 text-right'>
											<button onClick={() => startEdit(f)} className='text-blue-600 hover:underline mr-3'>
												Edytuj
											</button>
											<button onClick={() => handleDelete(f.id)} className='text-red-600 hover:underline'>
												Usuń
											</button>
										</td>
									</tr>
								))}
								{firmy.length === 0 && !loading && (
									<tr>
										<td colSpan={5} className='text-center py-6 text-slate-400'>
											Brak firm w bazie.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</section>
			</div>
		</div>
	)
}

export default AdminPanel
