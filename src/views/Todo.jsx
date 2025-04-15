import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos } from '../features/todo/TodoSlice'

function Todo() {
  const dispatch = useDispatch()
  const {todos, loading, error} = useSelector((state) => state.todo)

  useEffect(()=>{
    dispatch(fetchTodos())
  },[dispatch])

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error}</p>

  return (
    <ul>
      {todos.map((todo)=>(
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}

export default Todo