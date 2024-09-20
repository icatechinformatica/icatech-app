export function login(user) {
    return {
        type: 'LOG_IN',
        user
    }
}

export function refresh(user) {
    return {
        type: 'REFRESH',
        user
    }
}

export function logOut() {
    return {
        type: 'LOGOUT'
    }
}