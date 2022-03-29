import { BaseThunkType, InferActionsTypes } from "../store"
import { uid } from '../../utils/uid'
import { getRandomInt } from "../../utils/randomInt";
import { MatrixType } from "../../types/MatrixType";
import { ICell } from '../../types/CellInterface'
import { selectTable, selectX } from "./tableSelectors";
import { getMapKeyByIndex } from "../../utils/getMapKeyByIndex";
import { findClosestElement } from "../../utils/findClosestElement";

export const actions = {
   setMatrix: (
      matrix: MatrixType | null, 
      sum: Map<number, number>, 
      mid: Map<number, number>,
      size: {m: number, n: number}
   ) => ({
      type: 'TEST/TASK/SET_TABLE',
      payload: { matrix, sum, mid, size }
   } as const),
   setCurrentMatrixKey: (key: number) => ({
      type: 'TEST/TASK/SET_CURRENT_MATRIX_KEY',
      payload: { key }
   } as const),
   setCurrentPercentRow: (row: Map<number, string>) => ({
      type: 'TEST/TASK/SET_CURRENT_PERCENT_ROW',
      payload: { row }
   } as const),
   setClosestElements: (arr: number[]) => ({
      type: 'TEST/TASK/SET_CLOSEST_ELEMENTS',
      payload: { arr }
   } as const),
   setX: (x: number) => ({
      type: 'TEST/TASK/SET_X',
      payload: { x }
   } as const),
   deleteTable: () => ({
      type: 'TEST/TASK/DELETE_TABLE'
   } as const),

   setCurrentCellIndexes: (m: number, n: number) => ({
      type: 'TEST/TASK/SET_CURRENT_CELL_INDEXES',
      payload: { cellIndexes: { m, n } }
   } as const)
}

export const generateTable = (m: number, n: number, x: number): ThunkType => async (dispatch) => {
   const matrix: MatrixType = new Map()

   for (let i = 0; i < m; i++) {
      const row: Map<number, ICell> = new Map()

      for (let j = 0; j < n; j++) {
         const cell = generateCellData()
         row.set(j, cell)
      }
      
      matrix.set(i, row)
   }
   
   dispatch(actions.setX(x))
   dispatch(setTable(matrix))
}

export const incrementAmount = (m: number, n: number): ThunkType => async (dispatch, getState) => {
   const { matrix } = selectTable(getState())
   
   if (matrix) {
      const M = getMapKeyByIndex(matrix, m)  // Key of Map
      const N = getMapKeyByIndex(matrix.get(M), n) // Key of Inner Map

      const prevCell = matrix?.get(M)?.get(N)
      
      if (prevCell) {
         const newCell = { ...prevCell, amount: prevCell?.amount + 1 }
         matrix.get(M)?.set(N, newCell)
         
         dispatch(setTable(matrix))
         dispatch(fireClosestCells(m, n))
      }
   }
}

export const addRow = (): ThunkType => async (dispatch, getState) => {
   const { matrix, size: { n } } = selectTable(getState())

   const row: Map<number, ICell> = new Map()

   for (let j = 0; j < n; j++) {
      const cell = generateCellData()
      row.set(j, cell)
   }
   
   if (matrix) {
      const nextKey = getMapKeyByIndex(matrix, Number(matrix?.size - 1))
      matrix?.set(nextKey + 1, row)

      dispatch(setTable(matrix))
   }
}

export const deleteRow = (rowIndex: number): ThunkType => async (dispatch, getState) => {
   const { matrix } = selectTable(getState())

   if (matrix) {
      const rowKey = getMapKeyByIndex(matrix, rowIndex)
      
      matrix.delete(rowKey)
      dispatch(setTable(matrix))
   }
   
}

export const showPercent = (sumRowIndex: number): ThunkType => async (dispatch, getState) => {
   const { matrix, sumRows } = selectTable(getState())

   if (matrix) {
      const currMainMatrixKey = getMapKeyByIndex(matrix, sumRowIndex)

      const row = matrix?.get(currMainMatrixKey)
      const sumCell = sumRows.get(getMapKeyByIndex(sumRows, sumRowIndex))

      const percentRow = new Map()

      if (row && sumCell) {
         for (let [key, value] of row.entries()) {
            percentRow.set(key, calcPercent(value.amount, sumCell))
         }
      }

      dispatch(actions.setCurrentPercentRow(percentRow))
      dispatch(actions.setCurrentMatrixKey(currMainMatrixKey))
   }
}

export const fireClosestCells = (m: number, n: number): ThunkType => async (dispatch, getState) => {
   const { matrix } = selectTable(getState())
   const x = selectX(getState())

   if (matrix) {
      const M = getMapKeyByIndex(matrix, m)  // Key of Map
      const N = getMapKeyByIndex(matrix.get(M), n) // Key of Inner Map
      const cell = matrix?.get(M)?.get(N)
      
      if (cell) {
         let allNumbers: number[] = []
         for (let value of matrix.values()) {
            allNumbers = [...allNumbers, ...Array.from(value.values()).map(cell => cell.amount)]
         }
         
         const closestNumbers: number[] = []
         for (let i = 0; i <= x; i++) {
            if (i === 0) continue
            if (allNumbers.length === 0) break
            const closest = findClosestElement(allNumbers, cell.amount)
            allNumbers = allNumbers.filter(el => el !== closest)
            closestNumbers.push(closest)
         }
         dispatch(actions.setClosestElements(closestNumbers))
      }

   }
}

const setTable = (matrix: MatrixType): ThunkType => async (dispatch) => {
   const sum = countRowSum(matrix)
   const mid = countColumnMid(matrix)
   const size = {
      m: matrix.size,
      n: matrix.get(getMapKeyByIndex(matrix, 0))?.size || 0
   }
   dispatch(actions.setMatrix(matrix, sum, mid, size))
}

const calcPercent = (number: number, total: number): string => {
   return (number * 100 / total).toFixed(2)
}

const generateCellData = (): ICell => ({ id: uid(), amount: getRandomInt(999) })

const countRowSum = (matrix: MatrixType): Map<number, number> => {
   let count = new Map()

   matrix.forEach((value, key) => {
      let cellSum = 0

      value.forEach((cell, k) => {
         cellSum += cell.amount
      })

      count.set(key, cellSum);
   })

   return count
}

const countColumnMid = (matrix: MatrixType): Map<number, number> => {
   let count = new Map()
   
   for (let i = 0; i < Number(matrix.get(getMapKeyByIndex(matrix, 0))?.size); i++) {
      let columnSum = 0
      matrix.forEach((value, key, map) => {
         columnSum += value.get(i)?.amount || 0
      })
      
      count.set(i, (columnSum / matrix.size).toFixed(1))
   }

   return count
}

export type TableActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<TableActionsType>