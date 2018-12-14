const theme = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_USER_DATA':
            return action.data
        default:
            return state
    }
}
  
export default theme
  