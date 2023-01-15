import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import { Auth as AuthType } from 'firebase/auth'

import { AuthInputs } from 'types'
import SigninAndSignup from 'components/SigninAndSignup'

function SignIn() {
  const [errorMsg, setErrorMsg] = useState<string>('')
  const navigate = useNavigate()

  const handleSignInSubmit = (auth: AuthType) => async (data: AuthInputs) => {
    try {
      //TODO: user 필요할 때 활용
      // const userCredential = await signInWithEmailAndPassword(
      //   auth,
      //   data.email,
      //   data.password,
      // )
      //userCredential.user

      navigate('/')
    } catch (err) {
      const errorCode = (err as FirebaseError).code
      console.log(errorCode)
      setErrorMsg('아이디 또는 비밀번호가 틀렸습니다.')
    }
  }

  return (
    <SigninAndSignup
      pageName="Sign in"
      errorMsg={errorMsg}
      setErrorMsg={setErrorMsg}
      onSubmit={handleSignInSubmit}
    />
  )
}

export default SignIn
