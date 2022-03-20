import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
const MainPage = React.lazy(() => import('../MainPage/MainPage'))

export const Root: React.FC = React.memo(() => {
   return (
      <Suspense fallback={<p>Loading...</p>}>
         <Switch>
            <Route exact path="/table" component={MainPage} />
            <Route path="*" component={() => <Redirect to="/table" />} />
        </Switch>
      </Suspense>
   )
});