import { useState } from 'react'
import RouterRender from '../routes/Router'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      <RouterRender isLoggedIn={isLoggedIn} />
    </>
  )
}

export default App
