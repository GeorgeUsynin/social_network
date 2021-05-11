const FOLLOW_USER = 'FOLLOW_USER'
const UNFOLLOW_USER = 'UNFOLLOW_USER'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
// const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'


//types
type UserLocationType = {
    city: string
    country: string
}

export type UserPhotoType = {
    small: string | null
    large: string | null
}

export type UserType = {
    id: number
    photos: UserPhotoType
    followed: boolean
    name: string
    status: string
    location?: UserLocationType
}

export type UsersPageType = {
    users: Array<UserType>
    pageSize: number
    totalUsersAmount: number
    currentPage: number
    isFetching: boolean
}

export type UsersReducerACsType =
    ReturnType<typeof follow>
    | ReturnType<typeof unFollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setIsFetching>
    // | ReturnType<typeof setUserTotalCountAC>

//actionCreators
export const follow = (userID: number) => {
    return {
        type: FOLLOW_USER,
        userID

    } as const
}

export const unFollow = (userID: number) => {
    return {
        type: UNFOLLOW_USER,
        userID
    } as const
}

export const setUsers = (users: Array<UserType>) => {
    return {
        type: SET_USERS,
        users
    } as const
}

export const setCurrentPage = (page: number) => {
    return {
        type: SET_CURRENT_PAGE,
        page
    } as const
}

export const setIsFetching = (isFetching: boolean) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    } as const
}

// export const setUserTotalCountAC = (totalCount: number) => {
//     return {
//         type: SET_TOTAL_USERS_COUNT,
//         totalCount
//     } as const
// }



//initialState
const initialState: UsersPageType = {
    users: [],
    pageSize: 20,
    totalUsersAmount: 135,
    currentPage: 1,
    isFetching: false
}

//reducer
export const usersReducer = (state: UsersPageType = initialState, action: UsersReducerACsType): UsersPageType => {
    switch (action.type) {
        case FOLLOW_USER:
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: true} : u)}
        case UNFOLLOW_USER:
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: false} : u)}
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.page}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        // case SET_TOTAL_USERS_COUNT:
        //     return {...state, totalUsersAmount: action.totalCount}
        default:
            return state
    }
}

export default usersReducer;