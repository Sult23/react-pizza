import React from 'react'
import Header from './components/Header'
import Home from './Pages/Home'
import { Routes, Route } from 'react-router-dom'
import './scss/app.scss'
import Basket from './Pages/Basket'

export const SearchContext = React.createContext()

function App() {
	const [searchValue, setSearchValue] = React.useState('')

	return (
		<div className='App'>
			<div className='wrapper'>
				<SearchContext.Provider value={{ searchValue, setSearchValue }}>
					<Header />
					<div className='content'>
						<div className='container'>
							<Routes>
								<Route path='/' element={<Home />} />
								<Route path='/Basket' element={<Basket />} />
							</Routes>
						</div>
					</div>
				</SearchContext.Provider>
			</div>
		</div>
	)
}

export default App
