const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_WALLETS':
            return {
                ...state,
                wallets: action.payload
            }
        case 'SET_SELECTED_WALLET':
            return {
                ...state,
                selectedWallet: action.payload
            }
        case 'SET_CONTRACT_CODE':
            return {
                ...state,
                code: action.payload
            }
        case 'SET_UNSIGNED_TRANSACTION':
            return {
                ...state,
                unsignedContractTransaction: action.payload
            }
        case 'SET_TRANSACTION':
            return {
                ...state,
                completedTransaction: action.payload
            }
        default:
            return state;
    }
};

export default reducer;
