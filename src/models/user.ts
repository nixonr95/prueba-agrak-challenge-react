export interface User {
    createdAt:     string,
    first_name:    string,
    avatar:        string,
    second_name:   string,
    email:         string,
    id?:            string,
}

export interface Users {
    users: User[],
    isLoading: boolean,
    userSelected: User | null
}