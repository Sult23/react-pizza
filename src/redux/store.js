import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/FilterSlice.js'
import cart from './slices/cartSlice.js'
import pizza from './slices/pizzaSlice.js'

export const store = configureStore({
	reducer: {
		filter,
		cart,
		pizza,
	},
})
