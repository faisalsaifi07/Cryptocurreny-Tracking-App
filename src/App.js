import {BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Home from './Pages/Home';
import CoinPgae from './Pages/CoinPgae';
import { makeStyles } from "@material-ui/core";
import './App.css'


const useStyles = makeStyles(()=> ({
  App : {
    backgroundColor : '#14161a' ,
    minHeight : '100vh',
    color :  'white'
  }
}));

function App() {

  const classes =  useStyles()


  return (
    <Router>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path='/' element ={<Home />} />
          <Route path='/coins/:id' element ={<CoinPgae />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
