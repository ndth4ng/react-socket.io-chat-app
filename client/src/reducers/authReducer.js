export const authReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case "SET_AUTH":
      return {
        ...state,
        authLoading: false,
        isAuthenticated: payload.isAuthenticated,
        user: payload.user,
      };

    default:
      return state;
  }
};
