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

  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      return setUser(user)
    } else {
      return undefined
    }
  })

  const isLoading = user === null

  return { user, isLoading }
}
