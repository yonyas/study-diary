import { Auth as AuthType, createUserWithEmailAndPassword } from 'firebase/auth'

import Auth from 'components/Auth'
import { AuthInputs } from 'types'
import { FirebaseError } from 'firebase/app'

function SignUp() {
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
      const errorMessage = (err as FirebaseError).message
      console.log(errorCode, errorMessage)
    }
  }

  return <Auth pageName="Sign up" onSubmit={handleSignUpSubmit} />
}

export default SignUp
