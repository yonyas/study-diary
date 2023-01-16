import { useState } from 'react'
import {
  getAuth,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from 'firebase/auth'

import { firebaseApp } from './firebaseAuth'

export const firebaseAuth = getAuth(firebaseApp)

export const signOut = () => firebaseSignOut(firebaseAuth)

export function useAuthState() {
  const [user, setUser] = useState<null | any>(firebaseAuth.currentUser)
  const [isLoading, setIsLoading] = useState(true)

  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      setIsLoading(false)
      return setUser(user)
    } else {
      setIsLoading(false)
    }
  })

  return { user, isLoading }
}
