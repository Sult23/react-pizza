import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk(
	'pizza/fetchPizzasStatus',
	async params => {
		const { searchValue, categoryId, sort } = params
		const { data } = await axios.get(
			`https://62c9a0124795d2d81f7f5fbd.mockapi.io/items?${
				searchValue ? `search=${searchValue}` : ''
			}${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${
				sort.sortProperty
			}&order=desc`
		)
		return data
	}
)

const initialState = {
	items: [],
	status: 'loading',
}

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setPizzas(state, action) {
			state.items = action.payload
		},
	},
	extraReducers: {
		[fetchPizzas.pending]: state => {
			state.status = 'loading'
			state.items = []
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			state.items = action.payload
			state.status = 'success'
		},
		[fetchPizzas.rejected]: state => {
			state.status = 'error'
			state.items = []
		},
	},
})

export const { setPizzas } = pizzaSlice.actions

export default pizzaSlice.reducer
