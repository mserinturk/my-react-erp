import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../features/user/UserSlice'

const Home = () => {
  const dispatch = useDispatch()
  const { users, loading, error } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

export default Home