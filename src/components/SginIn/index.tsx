import { Auth as AuthType } from 'firebase/auth'
import { useForm } from 'react-hook-form'

import { AuthInputs } from 'types'
import Auth from 'components/Auth'

function SignIn() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthInputs>()

  const handleSignInSubmit = (auth: AuthType) => async (data: AuthInputs) => {}

  return <Auth pageName="Sign in" onSubmit={handleSignInSubmit} />
}

export default SignIn
