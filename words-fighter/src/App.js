import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import CommingSoon from "./pages/comming-soon/comming-soon";
import Content from './pages/content/content';
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
        <Route path="/">
          <Redirect to="/top"></Redirect>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
