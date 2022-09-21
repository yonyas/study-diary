import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import Auth from '../routes/Auth'
import Home from '../routes/Home'

interface Props {
  isLoggedIn: boolean
}

const RouterRender = ({ isLoggedIn }: Props) => {
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />}></Route>
          </>
        ) : (
          <Route path="/" element={<Auth />}></Route>
        )}
      </Routes>
    </Router>
  )
}

export default RouterRender
