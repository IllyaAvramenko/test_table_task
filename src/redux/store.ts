import { Action, createStore, applyMiddleware } from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import { rootReducer } from "./rootReducer";

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>


export default store;