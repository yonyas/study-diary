import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import SignInPage from './AuthPage'
import HomePage from './HomePage'
import SignUpPage from './SignUpPage'
import Loading from 'components/Loading'

interface Props {
  authState: any
}

const RouterRender = ({ authState }: Props) => {
  const initialElement = !authState.isLoading ? (
    authState.user ? (
      <HomePage />
    ) : (
      <SignInPage />
    )
  ) : (
    <Loading size="full" />
  )

  return (
    <Router>
      <Routes>
        <Route path="/" element={initialElement} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  )
}

export default RouterRender
