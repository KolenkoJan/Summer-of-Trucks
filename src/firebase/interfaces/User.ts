export interface IUser {
    id: string // firebase ID
    email: string
    displayName: string
    photoURL: string
    isAdmin?: boolean
}

export type IUserSearchParams = Partial<Pick<IUser, "id" | "email">>
