
const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_WALLETS':
            return {
                ...state,
                wallets: action.payload
            }
        default:
            return state;
    }
};

export default reducer;
