import React from "react";
import { useDispatch } from "react-redux";
import { generateTable } from "../../redux/Table/tableActions";

export const InitialForm: React.FC = React.memo(() => {

   const dispatch = useDispatch()

   const [m, setM] = React.useState<number>(0)
   const [n, setN] = React.useState<number>(0)
   const [x, setX] = React.useState<number>(0)

   const onSubmit = () => {
      dispatch(generateTable(m, n, x))
   }

   return (
      <form onSubmit={onSubmit}>
         <div>
            <label htmlFor="m">Rows</label>
            <div>
               <input id="m" type="text" value={m} onChange={(e) => setM(Number(e.target.value.replace(/\D/,'')))}/>
            </div>
         </div>
         <div>
            <label htmlFor="n">Columns</label>
            <div>
               <input id="n" type="text" value={n} onChange={(e) => setN(Number(e.target.value.replace(/\D/,'')))}/>
            </div>
         </div>
         <div>
            <label htmlFor="x">X</label>
            <div>
               <input id="x" type="text" value={x} onChange={(e) => setX(Number(e.target.value.replace(/\D/,'')))}/>
            </div>
         </div>

         <button>Create table</button>
      </form>
   )
})