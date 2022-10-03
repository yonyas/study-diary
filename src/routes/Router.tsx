import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import AuthPage from './AuthPage'
import HomePage from './HomePage'

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
          <Route path="/" element={<AuthPage />}></Route>
        )}
      </Routes>
    </Router>
  )
}

export default RouterRender
