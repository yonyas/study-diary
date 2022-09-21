import { useState } from 'react'
import RouterRender from './Router'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return <RouterRender isLoggedIn={isLoggedIn} />
}

export default App
