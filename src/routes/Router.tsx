import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import SignInPage from './AuthPage'
import HomePage from './HomePage'
import SighUpPage from './SignUpPage'

interface Props {
  isLoggedIn: boolean
}

const RouterRender = ({ isLoggedIn }: Props) => {
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<HomePage />}></Route>
          </>
        ) : (
          <Route path="/" element={<SignInPage />}></Route>
        )}
        <Route path="/signup" element={<SighUpPage />}></Route>
      </Routes>
    </Router>
  )
}

export default RouterRender
