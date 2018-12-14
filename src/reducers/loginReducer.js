export default (state = true, action) => {
  switch(action.type) {
  case 'FIRST_ENTRANCE':
    return action.payload;
  }
  return state;
}
