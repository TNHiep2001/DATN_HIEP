import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'

import ProtectedRoute from './components/Routes/ProtectedRoute'
import AuthenticatedRoute from './components/Routes/AuthenticatedRoute'
import Home from './views/home/Home'
import routes from './routes/main'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layouts/DefaultLayout'))

const Login = React.lazy(() => import('./views/login/Login'))
const Register = React.lazy(() => import('./views/register/Register'))
const Page404 = React.lazy(() => import('./views/page404/Page404'))

const App = () => {
  const renderRoutesAuthen = () => {
    return (
      <AuthenticatedRoute
        exact
        path="/login"
        name="Login"
        component={(props) => <Login {...props} />}
      />
    )
  }

  const renderRoutesRegister = () => {
    return (
      <AuthenticatedRoute
        exact
        path="/register"
        name="Register"
        component={(props) => <Register {...props} />}
      />
    )
  }

  const renderRoutesProtected = () => {
    return routes.map((route, index) => (
      <ProtectedRoute
        key={index}
        exact={route.exact}
        path={route.path}
        name={route.name}
        component={(props) => <DefaultLayout component={route.component} {...props} />}
      />
    ))
  }

  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          {renderRoutesAuthen()}
          {renderRoutesRegister()}
          {renderRoutesProtected()}
          <ProtectedRoute
            exact
            path="/"
            name="Home"
            component={(props) => <DefaultLayout component={Home} {...props} />}
          />
          <Route exact path="*" name="Page 404" render={(props) => <Page404 {...props} />} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default App
