import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home';
import PokemonCreate from './components/CreatePokemon/CreatePokemon';
import Detail from './components/Detail/Detail';
import Header from './components/Header/Header';
import PostPokemon from './components/PostPokemon/PostPokemon';


function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
        <Route path='/' component={Header} />
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/pokemon' component={PokemonCreate} />
          <Route exact path='/details/:id' component={Detail} />
          <Route exact path='/postpokemon' component={PostPokemon} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
