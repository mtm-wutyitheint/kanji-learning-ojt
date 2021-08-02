import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import React from "react";
import GuardedRoute from "./guardedRoute";
import CommingSoon from "./pages/comming-soon";
import Content from './pages/content';
import Learn from "./pages/learn";
import Quiz from "./pages/quiz/quiz";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Profile from "./pages/profile/profile";
import Top from './pages/top/top'

function App() {
  const protectedRoutes = [
    { path: '/comming-soon', component: CommingSoon },
    { path: '/content', component: Content },
    { path: '/top', component: Top },
    { path: '/learn', component: Learn },
    { path: '/quiz', component: Quiz },
    { path: '/profile', component: Profile }
  ]

  return (

    <Router>
      <Switch>
        {protectedRoutes.map((route, i) => {
          return (
            <GuardedRoute key={i} path={route.path} component={route.component} />
          )
        })}
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/">
          <Redirect to="/top"></Redirect>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
