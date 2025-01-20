import './App.css';
import Home from './components/Home';
import DetailsPage from './components/DetailsPage';
import {BrowserRouter,Switch,Route,Link} from 'react-router-dom';
const App = ()=> {
  return (
     <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/:id" component={DetailsPage}/>
          </Switch>
        </BrowserRouter>
     </div>
  );
}

export default App;
