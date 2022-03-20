import React from "react"
import { useSelector } from "react-redux"
import { selectTable } from "../../redux/Table/tableSelectors"
import { InitialForm } from "../InitialForm/InitialForm"
import { Table } from "../Table/Table"

const MainPage: React.FC = React.memo(() => {

   const { matrix } = useSelector(selectTable)

   if (matrix) return <Table />

   return <InitialForm/>
}) 

export default MainPage