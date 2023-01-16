import { signOut } from 'Auth/useAuthState'

function HomePage() {
  return <div onClick={() => signOut()}>Home</div>
}

export default HomePage
