import { useEffect, useState } from 'react'
import {
  getAuth,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from 'firebase/auth'

import { firebaseApp } from '../firebaseConfig'

export const firebaseAuth = getAuth(firebaseApp)

export const signOut = () => firebaseSignOut(firebaseAuth)

export function useAuthState() {
  const [user, setUser] = useState<null | any>(firebaseAuth.currentUser)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setIsLoading(false)
        setUser(user)
      } else {
        setIsLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return { user, isLoading }
}
