const initialState = {
    isRunning: true,
    value: 0,
  };
  
  const timerReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'START_TIMER':
        return { ...state, isRunning: true };
      case 'STOP_TIMER':
        return { ...state, isRunning: false };
      case 'INCREMENT_TIMER':
        return { ...state, value: state.value + 1 };
      default:
        return state;
    }
  };
  
  export default timerReducer;