import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
const Table = React.lazy(() => import('../Table/Table'))
const InitialForm = React.lazy(() => import('../InitialForm/InitialForm'))

export const Root: React.FC = React.memo(() => {
   return (
      <Suspense fallback={<p>Loading...</p>}>
         <Switch>
            <Route exact path='/form' component={InitialForm}/>
            <Route exact path='/table' component={Table} />
            <Route path='*' component={() => <Redirect to='/form' />} />
        </Switch>
      </Suspense>
   )
});