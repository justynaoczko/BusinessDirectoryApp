import React, { useState } from 'react'

function App() {
	const [firmy] = useState([
		{ id: 1, nazwa: 'Tech-Solution', opis: 'Naprawa komputerów i nowoczesne sieci bezprzewodowe.', kat: 'IT' },
		{ id: 2, nazwa: 'Pyszne Bułki', opis: 'Tradycyjne wypieki na naturalnym zakwasie.', kat: 'Gastronomia' },
		{ id: 3, nazwa: 'Złota Rączka', opis: 'Kompleksowe remonty mieszkań i domów.', kat: 'Budownictwo' },
		{ id: 4, nazwa: 'Auto-Fix', opis: 'Szybka diagnostyka i mechanika pojazdowa.', kat: 'Motoryzacja' },
		{ id: 5, nazwa: 'Eko-Ogród', opis: 'Projektowanie i pielęgnacja terenów zielonych.', kat: 'Usługi' },
		{ id: 6, nazwa: 'Kancelaria Lex', opis: 'Doradztwo prawne dla osób prywatnych i firm.', kat: 'Prawo' },
	])

	return (
		<div className='min-h-screen bg-gray-50 p-6 md:p-12'>
			{/* Nagłówek strony */}
			<header className='max-w-6xl mx-auto mb-16 text-center'>
				<h1 className='text-5xl font-extrabold text-slate-900 mb-4 tracking-tight'>
					Katalog <span className='text-blue-600'>Firm</span>
				</h1>
				<p className='text-lg text-slate-600 max-w-2xl mx-auto'>
					Wyszukaj najlepszych specjalistów w Twoim regionie. Wszystkie firmy w jednym miejscu.
				</p>
			</header>

			{/* Kontener na karty - Responsive Grid */}
			<main className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
				{firmy.map(firma => (
					<div
						key={firma.id}
						className='bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>
						<div className='flex justify-between items-start mb-4'>
							<span className='bg-blue-50 text-blue-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider'>
								{firma.kat}
							</span>
						</div>

						<h2 className='text-2xl font-bold text-slate-800 mb-3 text-balance'>{firma.nazwa}</h2>

						<p className='text-slate-600 mb-6 leading-relaxed text-sm'>{firma.opis}</p>

						<button className='w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition-colors duration-300'>
							Zobacz profil
						</button>
					</div>
				))}
			</main>

			{/* Stopka - żeby projekt wyglądał na dokończony */}
			<footer className='mt-20 text-center text-slate-400 text-sm'>
				&copy; 2026 Projekt Katalog Firm - Arkadiusz & Justyna
			</footer>
		</div>
	)
}

export default App
