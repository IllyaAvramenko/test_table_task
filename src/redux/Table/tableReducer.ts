import { TableActionsType } from "./tableActions"

const initialState = {
   table: {
      matrix: null as null | MatrixType,
      size: {
         m: 0 as number,
         n: 0 as number
      },
      sumRows: new Map() as Map<number, number>,
      midColumns: new Map() as Map<number, number>,
   },
   x: 0,
   currentMatrixKey: -1 as number,
   currentPercentRow: new Map() as Map<number, string>,
   closestElements: [] as Array<number>
}

type InitialStateType = typeof initialState

export const tableReducer = (state = initialState, action: TableActionsType): InitialStateType => {
   switch(action.type) {

      case 'TEST/TASK/SET_TABLE':
         return { 
            ...state, 
            table: {
               ...state.table,
               matrix: action.payload.matrix,
               sumRows: action.payload.sum,
               midColumns: action.payload.mid,
               size: { ...action.payload.size }
            }  
         }

      case 'TEST/TASK/SET_CURRENT_MATRIX_KEY':
         return { ...state, currentMatrixKey: action.payload.key }

      case 'TEST/TASK/SET_CURRENT_PERCENT_ROW':
         return { ...state, currentPercentRow: action.payload.row }

      case 'TEST/TASK/SET_CLOSEST_ELEMENTS':
         return { ...state, closestElements: [ ...action.payload.arr ] }
      
      case 'TEST/TASK/SET_X':
         return { ...state, x: action.payload.x }

      default: 
         return state
   }
}

export type MatrixType = Map<number, Map<number, ICell>>
export interface ICell {id: string, amount: number}