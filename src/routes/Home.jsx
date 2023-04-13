import React from 'react'
import { SearchContext } from '../App'
import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import Sort from '../components/Sort'
import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId } from '../redux/slices/FilterSlice.js'
import { fetchPizzas } from '../redux/slices/pizzaSlice'

const Home = () => {
	const { categoryId, sort } = useSelector(state => state.filter)
	const { items, status } = useSelector(state => state.pizza)
	const dispatch = useDispatch()
	const { searchValue } = React.useContext(SearchContext)
	const onChangeCategory = id => {
		dispatch(setCategoryId(id))
	}

	const fetchData = async () => {
		dispatch(fetchPizzas({ searchValue, categoryId, sort }))
		window.scrollTo(0, 0)
	}

	React.useEffect(() => {
		fetchData()
	}, [categoryId, sort.sortProperty, searchValue])
	const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />)
	const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />)
	return (
		<>
			<div className='content__top'>
				<Categories
					value={categoryId}
					onClickCategory={i => onChangeCategory(i)}
				/>
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			{status === 'error' ? (
				<div>Eror!!!</div>
			) : (
				<div className='content__items'>
					{status === 'loading' ? skeleton : pizzas}
				</div>
			)}
		</>
	)
}

export default Home
