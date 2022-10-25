import { useState } from 'react'
import { FirebaseError } from 'firebase/app'
import { Auth as AuthType, signInWithEmailAndPassword } from 'firebase/auth'

import { AuthInputs } from 'types'
import Auth from 'components/Auth'

function SignIn() {
  const [errorMsg, setErrorMsg] = useState<string>('')

  const handleSignInSubmit = (auth: AuthType) => async (data: AuthInputs) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      )

      console.log(userCredential.user)
    } catch (err) {
      const errorCode = (err as FirebaseError).code
      console.log(errorCode)
      setErrorMsg('아이디 또는 비밀번호가 틀렸습니다.')
    }
  }

  return (
    <Auth
      pageName="Sign in"
      errorMsg={errorMsg}
      setErrorMsg={setErrorMsg}
      onSubmit={handleSignInSubmit}
    />
  )
}

export default SignIn
