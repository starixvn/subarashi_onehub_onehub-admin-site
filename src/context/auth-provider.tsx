import { createContext, useEffect } from 'react'
import { useCheckSignIn } from '@/features/auth/api/mutations'
import {useNavigate} from "@tanstack/react-router";

type AuthProviderProps = {
  children: React.ReactNode
}

type AuthContextValue = Record<string, never>

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: AuthProviderProps) {
  const { mutateAsync: checkSignIn } = useCheckSignIn()
  const navigate = useNavigate()
 
  useEffect(() => {
    const verifyAuth = async () => {
      const response = await checkSignIn()
      if (!response.isLogin) {
        navigate({ to: '/sign-in', replace: true })
      }
    }

    verifyAuth()
  }, [checkSignIn, navigate])
  
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}
