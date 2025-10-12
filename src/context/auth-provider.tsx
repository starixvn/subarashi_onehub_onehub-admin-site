import { createContext, useContext, useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { authApi } from '@/features/auth/api/client'
import type {
  SignInRequest,
  AuthUser,
} from '@/features/auth/types'

type AuthProviderProps = {
  children: React.ReactNode
}

export type AuthContextValue = {
  isAuthenticated: boolean
  user: AuthUser | null
  isLoading: boolean
  isLoginPending: boolean
  isLogoutPending: boolean
  login: (credentials: SignInRequest) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const queryClient = useQueryClient()

  const loginMutation = useMutation({
    mutationFn: async (credentials: SignInRequest) => {
      const signInResponse = await authApi.signIn(credentials)

      if (signInResponse.errorCode === 0) {
        const userDataResponse = await authApi.getUserData(1)

        if (userDataResponse.errorCode === 0) {
          return { ...userDataResponse.data, isAuthenticated: true }
        }
      }

      throw new Error(signInResponse.message || 'Login failed')
    },
    onSuccess: (userData) => {
      setUser(userData)
      toast.success('Login successful')
    },
    onError: () => {
      setUser(null)
    },
  })

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await authApi.signOut()
      setUser(null)
      queryClient.clear()
    },
    onSuccess: () => {
      toast.success('Signed out successfully')
      // /sign-in router beforeLoad 會先觸發，所以要用 window.location.href 強制導頁
      window.location.href = '/sign-in'
    },
  })

  const checkAuth = async (): Promise<boolean> => {
    try {
      const response = await authApi.checkSignIn()
      return response.errorCode === 0
    } catch {
      return false
    }
  }

  const login = async (credentials: SignInRequest): Promise<void> => {
    await loginMutation.mutateAsync(credentials)
  }

  const logout = async (): Promise<void> => {
    await logoutMutation.mutateAsync()
  }

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const value: AuthContextValue = {
    isAuthenticated: !!user,
    user,
    isLoading,
    isLoginPending: loginMutation.isPending,
    isLogoutPending: logoutMutation.isPending,
    login,
    logout,
    checkAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
