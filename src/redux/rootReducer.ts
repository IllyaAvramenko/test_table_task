import { combineReducers } from "redux";
import { tableReducer } from "./Table/tableReducer";

export const rootReducer = combineReducers({
   table: tableReducer
})