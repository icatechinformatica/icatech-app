export default (state = {}, action)=>{
    switch(action.type) {
        case 'LOG_IN':
            return action.user;
        case 'REFRESH':
            return action.user;
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
}