/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import s from './Table.module.css';
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getMapKeyByIndex } from "../../utils/getMapKeyByIndex";

import { actions, addRow, deleteRow, fireClosestCells, incrementAmount, showPercent } from "../../redux/Table/tableActions";
import { selectClosestElements, selectCurrentKey, selectCurrentPercentRow, selectTable } from "../../redux/Table/tableSelectors";
import { getCellByIndexesInMatrix } from "../../utils/getCellByIndexesFromMatrix";

const Table: React.FC = React.memo(() => {
   const dispatch = useDispatch()

   const { matrix, size, sumRows, midColumns } = useSelector(selectTable)
   const currentkey = useSelector(selectCurrentKey)
   const currentPercentRow = useSelector(selectCurrentPercentRow)
   const closestElements = useSelector(selectClosestElements)
   
   const M = React.useMemo(() => new Array(size.m).fill(0), [size.m])
   const N = React.useMemo(() => new Array(size.n).fill(0), [size.n])

   const handleIncrementAmount = (m: number, n: number) => {
      dispatch(incrementAmount(m, n))
   }

   const onAddRow = () => {
      dispatch(addRow())
   }

   const onDeleteRow = (rowIndex: number) => {
      dispatch(deleteRow(rowIndex))
   }

   const onShowPercent = (sumRowIndex: number) => {
      dispatch(showPercent(sumRowIndex))
   }

   const hidePercent = () => {
      dispatch(actions.setCurrentMatrixKey(-1))
   }

   const onFireClosestCells = (m: number, n: number) => {
      dispatch(actions.setCurrentCellIndexes(m, n))
      dispatch(fireClosestCells(m, n))
   }

   const clearClosestCells = () => {
      dispatch(actions.setClosestElements([]))
   }

   const onCreateNewTable = () => {
      dispatch(actions.deleteTable())
   }
   
   if (!matrix) return <Redirect to='/form' />
   
   return (
      <div className={s.table}>
         <button onClick={onCreateNewTable}>Create new table</button>
         <button onClick={onAddRow} >Add row</button>
         
         {M.map((m, i) => {
            const rowKey = getMapKeyByIndex(matrix, i)

            return (
               <div key={i} style={{ display: 'flex' }}>
   
                  <button onClick={() => onDeleteRow(i)}>Delete</button>
   
                  <div className={s.table__row} >
                     {N.map((n, j) => {
                        const currentCell = getCellByIndexesInMatrix(matrix, i, j)
                        if (!currentCell) return <div>No cell</div>
                        
                        const isFired = closestElements.includes(currentCell.amount)
                        const cellPercent = currentPercentRow.get(getMapKeyByIndex(currentPercentRow, j))

                        return (
                           <div 
                              className={`${s.table__cell} ${isFired && s.active}`} 
                              onClick={() => handleIncrementAmount(i, j)}
                              onMouseOver={() => onFireClosestCells(i, j)}
                              onMouseOut={clearClosestCells}
                              key={j}
                           >
                              { currentkey === rowKey ? cellPercent + '%': currentCell.amount }
                              {(currentkey === rowKey) && 
                                 <span className={s.fill} style={{ width: `${cellPercent}%` }} ></span>}
                           </div>
                        )
                     })}
                     
                     <span 
                        className={s.table__sum} 
                        onMouseOver={() => onShowPercent(i)}
                        onMouseOut={hidePercent}
                     >
                        {sumRows.get(rowKey)}
                     </span>
   
                  </div>
               </div>
               
            )
         })}
         <div className={s.table__mid}>
            {N.map((v, k) => (
               <span key={k}>
                  {midColumns.get(k)}
               </span>
            ))}
         </div>
      </div>
   )
});

export default Table