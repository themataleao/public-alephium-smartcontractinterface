import { createContext, useReducer, Dispatch } from "react";
import reducer from "./Reducer";

interface State {
    test: string;
    wallets: object;
}

interface Action {
    type: string;
    payload?: any;
}

const initialState = {
    test: "test",
    wallets: {}
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
