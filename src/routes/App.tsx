import RouterRender from './Router'
import { useAuthState } from 'Auth/useAuthState'

function App() {
  const authState = useAuthState()

  return (
    <>
      <RouterRender authState={authState} />
    </>
  )
}

export default App
