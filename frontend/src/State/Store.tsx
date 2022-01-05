import { createContext, useReducer, Dispatch } from "react";
import reducer from "./Reducer";
import { TypeWalletBuild, TypeUnsignedTransaction, CompletedTransaction } from './Types';

interface State {
    test: string;
    wallets: any;
    code: string;
    selectedWallet: TypeWalletBuild;
    unsignedContractTransaction: TypeUnsignedTransaction;
    completedTransaction: CompletedTransaction;
}

interface Action {
    type: string;
    payload?: any;
}

const initialState = {
    test: "test",
    wallets: [],
    code: "",
    selectedWallet: {},
    unsignedContractTransaction: {},
    completedTransaction: {}
}

function Store({ children }: any) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext<[State, Dispatch<Action>]>([
    initialState,
    () => initialState
]);
export default Store;
