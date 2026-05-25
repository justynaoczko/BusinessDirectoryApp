import React, { useEffect, useState } from 'react'
import { getFirmy, getKategorie } from './api'

function PublicView({ onAdminClick }) {
	const [searchTerm, setSearchTerm] = useState('')
	const [kategoriaId, setKategoriaId] = useState('')
	const [firmy, setFirmy] = useState([])
	const [kategorie, setKategorie] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		getKategorie()
			.then(setKategorie)
			.catch(e => setError(e.message))
	}, [])

	useEffect(() => {
		setLoading(true)
		const timer = setTimeout(() => {
			getFirmy(searchTerm, kategoriaId || undefined)
				.then(data => {
					setFirmy(data)
					setError(null)
				})
				.catch(e => setError(e.message))
				.finally(() => setLoading(false))
		}, 300)
		return () => clearTimeout(timer)
	}, [searchTerm, kategoriaId])

	return (
		<div className='min-h-screen bg-gray-50 p-6 md:p-12'>
			<header className='max-w-6xl mx-auto mb-12 text-center'>
				<div className='flex justify-end mb-4'>
					<button
						onClick={onAdminClick}
						className='text-sm text-slate-500 hover:text-blue-600 underline'>
						Panel administracyjny
					</button>
				</div>

				<h1 className='text-5xl font-extrabold text-slate-900 mb-6 tracking-tight'>
					Katalog <span className='text-blue-600'>Firm</span>
				</h1>

				<div className='max-w-3xl mx-auto mb-10 p-8 bg-white rounded-3xl shadow-sm border border-slate-100'>
					<h2 className='text-xl font-bold text-slate-800 mb-3'>Twoje centrum lokalnego biznesu 🏢</h2>
					<p className='text-slate-600 leading-relaxed'>
						Witaj w naszym katalogu! Strona powstała, aby <strong>ułatwić kontakt</strong> między lokalnymi
						przedsiębiorcami a klientami. Skorzystaj z wyszukiwarki poniżej, aby filtrować wyniki po nazwie lub branży.
					</p>
				</div>

				<div className='mt-8 max-w-2xl mx-auto flex flex-col md:flex-row gap-3'>
					<div className='relative flex-1'>
						<input
							type='text'
							placeholder='Szukaj firmy lub branży...'
							className='w-full px-6 py-4 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg'
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
						/>
						<div className='absolute right-4 top-4 text-xl'>🔍</div>
					</div>
					<select
						value={kategoriaId}
						onChange={e => setKategoriaId(e.target.value)}
						className='px-4 py-4 rounded-2xl border border-slate-200 shadow-sm bg-white text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none'>
						<option value=''>Wszystkie kategorie</option>
						{kategorie.map(k => (
							<option key={k.id} value={k.id}>
								{k.nazwa} ({k.liczbaFirm})
							</option>
						))}
					</select>
				</div>
			</header>

			<main className='max-w-6xl mx-auto'>
				{error && (
					<div className='mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center'>
						{error}. Sprawdź, czy backend jest uruchomiony (http://localhost:5000).
					</div>
				)}

				{loading ? (
					<p className='text-center text-slate-500'>Ładowanie...</p>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{firmy.length > 0 ? (
							firmy.map(firma => (
								<div
									key={firma.id}
									className='bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>
									<div className='flex justify-between items-start mb-4'>
										<span className='bg-blue-50 text-blue-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider'>
											{firma.kategoriaNazwa}
										</span>
									</div>
									<h2 className='text-2xl font-bold text-slate-800 mb-3'>{firma.nazwa}</h2>
									<p className='text-slate-600 mb-4 leading-relaxed text-sm'>{firma.opis}</p>
									<div className='space-y-1 text-sm text-slate-500 mb-4'>
										{firma.adres && <p>📍 {firma.adres}</p>}
										{firma.telefon && <p>📞 {firma.telefon}</p>}
										{firma.email && <p>✉️ {firma.email}</p>}
										{firma.strona && (
											<p>
												🌐{' '}
												<a href={firma.strona} target='_blank' rel='noreferrer' className='text-blue-600 hover:underline'>
													{firma.strona}
												</a>
											</p>
										)}
									</div>
									<button className='w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition-colors duration-300'>
										Zobacz profil
									</button>
								</div>
							))
						) : (
							<div className='col-span-full text-center py-10'>
								<p className='text-slate-500 text-lg'>
									Nie znaleźliśmy firmy pasującej do filtrów.
								</p>
							</div>
						)}
					</div>
				)}
			</main>

			<footer className='mt-20 text-center text-slate-400 text-sm'>
				&copy; 2026 Projekt Katalog Firm - Arkadiusz & Justyna
			</footer>
		</div>
	)
}

export default PublicView
