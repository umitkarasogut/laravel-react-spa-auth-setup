export interface User {
    name: string
    email: string
}

export interface AuthContext {
    user: User | null
    loading: boolean
    login: (email: string, password: string) => void
    register: (name: string, email: string, password: string, password_confirmation: string) => void
    logout: () => void
    csrf: () => void
    checkSession: () => void
    errors: string[]
}