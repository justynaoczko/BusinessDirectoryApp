import React, { useState } from 'react'

function App() {
	// Stan dla hasła wyszukiwania
	const [searchTerm, setSearchTerm] = useState('')

	// Twoje dane (Mock Data)
	const [firmy] = useState([
		{ id: 1, nazwa: 'Tech-Solution', opis: 'Naprawa komputerów i nowoczesne sieci bezprzewodowe.', kat: 'IT' },
		{ id: 2, nazwa: 'Pyszne Bułki', opis: 'Tradycyjne wypieki na naturalnym zakwasie.', kat: 'Gastronomia' },
		{ id: 3, nazwa: 'Złota Rączka', opis: 'Kompleksowe remonty mieszkań i domów.', kat: 'Budownictwo' },
		{ id: 4, nazwa: 'Auto-Fix', opis: 'Szybka diagnostyka i mechanika pojazdowa.', kat: 'Motoryzacja' },
		{ id: 5, nazwa: 'Eko-Ogród', opis: 'Projektowanie i pielęgnacja terenów zielonych.', kat: 'Usługi' },
		{ id: 6, nazwa: 'Kancelaria Lex', opis: 'Doradztwo prawne dla osób prywatnych i firm.', kat: 'Prawo' },
	])

	// Logika filtrowania: sprawdzamy czy nazwa lub kategoria zawiera wpisany tekst
	const przefiltrowaneFirmy = firmy.filter(
		firma =>
			firma.nazwa.toLowerCase().includes(searchTerm.toLowerCase()) ||
			firma.kat.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	return (
		<div className='min-h-screen bg-gray-50 p-6 md:p-12'>
			<header className='max-w-6xl mx-auto mb-12 text-center'>
				<h1 className='text-5xl font-extrabold text-slate-900 mb-6 tracking-tight'>
					Katalog <span className='text-blue-600'>Firm</span>
				</h1>

				{/* SEKCJA WSTĘPNA - OPIS DZIAŁANIA */}
				<div className='max-w-3xl mx-auto mb-10 p-8 bg-white rounded-3xl shadow-sm border border-slate-100'>
					<h2 className='text-xl font-bold text-slate-800 mb-3'>Twoje centrum lokalnego biznesu 🏢</h2>
					<p className='text-slate-600 leading-relaxed'>
						Witaj w naszym katalogu! Strona powstała, aby <strong>ułatwić kontakt</strong> między lokalnymi
						przedsiębiorcami a klientami. Niezależnie od tego, czy szukasz sprawdzonego mechanika, pysznej kolacji, czy
						wsparcia prawnego – nasz system pozwala na błyskawiczne przeszukiwanie bazy zweryfikowanych firm. Skorzystaj
						z wyszukiwarki poniżej, aby filtrować wyniki po nazwie lub branży.
					</p>
				</div>

				{/* POLE WYSZUKIWARKI */}
				<div className='mt-8 max-w-md mx-auto relative'>
					<input
						type='text'
						placeholder='Szukaj firmy lub branży...'
						className='w-full px-6 py-4 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
					<div className='absolute right-4 top-4 text-xl'>🔍</div>
				</div>
			</header>

			<main className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
				{przefiltrowaneFirmy.length > 0 ? (
					przefiltrowaneFirmy.map(firma => (
						<div
							key={firma.id}
							className='bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>
							<div className='flex justify-between items-start mb-4'>
								<span className='bg-blue-50 text-blue-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider'>
									{firma.kat}
								</span>
							</div>
							<h2 className='text-2xl font-bold text-slate-800 mb-3'>{firma.nazwa}</h2>
							<p className='text-slate-600 mb-6 leading-relaxed text-sm'>{firma.opis}</p>
							<button className='w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition-colors duration-300'>
								Zobacz profil
							</button>
						</div>
					))
				) : (
					<div className='col-span-full text-center py-10'>
						<p className='text-slate-500 text-lg'>
							Nie znaleźliśmy firmy pasującej do: <span className='font-bold'>"{searchTerm}"</span>
						</p>
					</div>
				)}
			</main>

			<footer className='mt-20 text-center text-slate-400 text-sm'>
				&copy; 2026 Projekt Katalog Firm - Arkadiusz & Justyna
			</footer>
		</div>
	)
}

export default App
