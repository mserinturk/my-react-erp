import React from 'react'
import { useSelector } from 'react-redux'

function Home() {

  const state = useSelector((store) => store.user);
  console.log(state.user, state.isLoggedIn)

  return (
    <div>ERP Dashboard</div>
  )
}

export default Home