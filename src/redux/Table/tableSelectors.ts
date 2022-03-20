import { AppStateType } from "../store";

export const selectTable = (state: AppStateType) => state.table.table
export const selectCurrentKey = (state: AppStateType) => state.table.currentMatrixKey
export const selectCurrentPercentRow = (state: AppStateType) => state.table.currentPercentRow
export const selectClosestElements = (state: AppStateType) => state.table.closestElements
export const selectX = (state: AppStateType) => state.table.x