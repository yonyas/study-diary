import { Auth as AuthType, getAuth } from 'firebase/auth'
import { firebaseApp } from 'firebaseAuth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { AuthInputs } from 'types'
import AuthForm from './AuthForm'

type Props = {
  pageName: 'Sign in' | 'Sign up'
  onSubmit: (auth: AuthType) => SubmitHandler<AuthInputs>
}

function Auth({ pageName, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthInputs>()
  const auth = getAuth(firebaseApp)

  const handleGithubLoginClick = () => {}
  const handleGoogleLoginClick = () => {}

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {`${pageName} to your account`}
        </h2>

        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(onSubmit(auth))}
        >
          <AuthForm register={register} />

          {(errors.email || errors.password) && (
            <span className="text-gray-900 sm:text-sm">
              This field is required
            </span>
          )}

          {pageName === 'Sign in' && (
            <div className="text-sm flex justify-end">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 mb-200 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {pageName}
          </button>

          {pageName === 'Sign in' && (
            <div>
              <Link to="/signup">
                <button
                  type="submit"
                  className="relative flex w-full justify-center rounded-md border border-indigo-700 py-2 px-4 text-sm font-medium text-indigo-700 cursor-pointer hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Create new account
                </button>
              </Link>
            </div>
          )}
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
