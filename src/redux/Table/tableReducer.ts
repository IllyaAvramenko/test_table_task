import { ITable } from "../../types/TableInterface"
import { TableActionsType } from "./tableActions"

type InitialStateType = {
   table: ITable,
   x: number,
   currentMatrixKey: number,
   currentPercentRow: Map<number, string>,
   closestElements: Array<number>,
   currentCellIndexes: { m: number, n: number }
}

const initialState: InitialStateType = {
   table: {
      matrix: null,
      size: {
         m: 0,
         n: 0
      },
      sumRows: new Map(),
      midColumns: new Map(),
   },
   x: 0,
   currentMatrixKey: -1,
   currentPercentRow: new Map(),
   closestElements: [],
   currentCellIndexes: { m: 0, n: 0 } 
}

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
         return { ...state, closestElements: action.payload.arr }
      
      case 'TEST/TASK/SET_X':
         return { ...state, x: action.payload.x }

      case 'TEST/TASK/DELETE_TABLE':
         return { 
            ...state,
            table: {
               matrix: null,
               sumRows: new Map(),
               midColumns: new Map(),
               size: { m: 0, n: 0 }
            }   
         }

      case 'TEST/TASK/SET_CURRENT_CELL_INDEXES':
         return { ...state, currentCellIndexes: action.payload.cellIndexes }

      default: 
         return state
   }
}