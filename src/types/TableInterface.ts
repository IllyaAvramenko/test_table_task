import { MatrixType } from "./MatrixType"

export interface ITable {
   matrix: MatrixType | null
   size: { m: number, n: number }
   sumRows: Map<number, number>
   midColumns: Map<number, number>
} 