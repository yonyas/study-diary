import { FirebaseError } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { firebaseApp } from 'firebaseAuth'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'

import LoginForm from './LoginForm'

export type LoginInputs = {
  email: string
  password: string
}

function Auth() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInputs>()
  const auth = getAuth(firebaseApp)

  const handleSigninSubmit: SubmitHandler<LoginInputs> = async (data) => {
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
  const handleGithubLoginClick = () => {}
  const handleGoogleLoginClick = () => {}

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>

        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(handleSigninSubmit)}
        >
          <LoginForm register={register} />

          {(errors.email || errors.password) && (
            <span className="text-gray-900 sm:text-sm">
              This field is required
            </span>
          )}

          <div className="text-sm flex justify-end">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div>

          <button
            type="submit"
            className="relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 mb-200 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign in
          </button>

          <Link to="/signup">
            <button
              type="submit"
              className="relative flex w-full justify-center rounded-md border border-indigo-700 py-2 px-4 text-sm font-medium text-indigo-700 cursor-pointer hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create new account
            </button>
          </Link>
        </form>

        <div className="flex justify-between align-middle w-full ">
          <span className="relative top-50% -translate-y-1/2 w-1/3 border-b-2 border-gray-700" />
          <span className="text-center text-m text-gray-700">
            Or continue with
          </span>
          <span className="relative top-50% -translate-y-1/2 w-1/3 border-b-2 border-gray-700" />
        </div>
        <div className="flex justify-center gap-8">
          <button onClick={handleGithubLoginClick}>
            <img
              alt="github logo"
              src="/images/github-logo.png"
              className="object-cover h-12 w-12"
            />
          </button>
          <button onClick={handleGoogleLoginClick}>
            <img
              alt="google logo"
              src="/images/google-logo.png"
              className="object-cover h-12 w-12"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Auth
