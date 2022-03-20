import React from 'react'
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import { Root } from '../Root/Root'
import store from '../../redux/store'

export const App: React.FC = React.memo(() => {

   return (
      <BrowserRouter>
         <Provider store={store}>
            <Root/>
         </Provider>
      </BrowserRouter>
   )
});