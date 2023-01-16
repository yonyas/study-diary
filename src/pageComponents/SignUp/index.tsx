import { useState } from 'react'
import { FirebaseError } from 'firebase/app'
import { Auth as AuthType, createUserWithEmailAndPassword } from 'firebase/auth'

import { AuthInputs } from 'types'
import SigninAndSignup from 'components/SigninAndSignup'

function SignUp() {
  const [errorMsg, setErrorMsg] = useState<string>('')

  const handleSignUpSubmit = (auth: AuthType) => async (data: AuthInputs) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      )

      console.log(userCredential.user)
    } catch (err) {
      const errorCode = (err as FirebaseError).code
      console.log(errorCode)
      setErrorMsg('이미 사용중인 이메일입니다')
    }
  }

  return (
    <SigninAndSignup
      pageName="Sign up"
      errorMsg={errorMsg}
      setErrorMsg={setErrorMsg}
      onSubmit={handleSignUpSubmit}
    />
  )
}

export default SignUp
