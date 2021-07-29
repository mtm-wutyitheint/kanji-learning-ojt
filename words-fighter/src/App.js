import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import CommingSoon from "./pages/comming-soon";
import Content from './pages/content';
import Learn from "./pages/learn";
import Profile from "./pages/profile/profile";
import Top from './pages/top/top';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/comming-soon">
          <CommingSoon />
        </Route>
        <Route path="/content">
          <Content />
        </Route>
        <Route path="/top">
          <Top />
        </Route>
        <Route path="/learn">
          <Learn />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <Redirect to="/top"></Redirect>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
