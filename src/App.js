import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import makeStyles from '@mui/styles/makeStyles';
import Alert from './components/Alert';

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
    <div className={classes.App}>
      <Header/>
      <Routes>
      <Route path='/' element={<Homepage/>} exact/>
      <Route path='/coins/:id' element={<CoinPage/>} exact/>

      </Routes>
    </div>
    <Alert/>
    </BrowserRouter>
  );
}

export default App;
