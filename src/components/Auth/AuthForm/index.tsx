import { SetStateAction } from 'react'
import { Dispatch } from 'react'
import { UseFormRegister } from 'react-hook-form'

import { AuthInputs } from 'types'

type Props = {
  register: UseFormRegister<AuthInputs>
  setErrorMsg: Dispatch<SetStateAction<string>>
}

function AuthForm({ register, setErrorMsg }: Props) {
  return (
    <div>
      <div className="-space-y-px rounded-md shadow-sm">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            type="email"
            autoComplete="email"
            aria-label="email"
            onKeyDown={() => setErrorMsg('')}
            {...register('email', { required: '이메일을 적어주세요' })}
            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Email address"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="password"
            onKeyDown={() => setErrorMsg('')}
            {...register('password', {
              required: '비밀번호를 적어주세요',
              minLength: { value: 6, message: '6자 이상으로 적어주세요' },
            })}
            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Password"
          />
        </div>
      </div>
    </div>
  )
}

export default AuthForm
