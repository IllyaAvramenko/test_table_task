import { ICell } from '../types/CellInterface'
import { MatrixType } from '../types/MatrixType'
import { getMapKeyByIndex } from './getMapKeyByIndex'

export const getCellByIndexesInMatrix = (matrix: MatrixType, m: number, n: number): ICell | undefined => {
   const M = getMapKeyByIndex(matrix, m)  // Key of Map
   const N = getMapKeyByIndex(matrix.get(M), n) // Key of Inner Map
   const cell = matrix?.get(M)?.get(N)

   return cell
}