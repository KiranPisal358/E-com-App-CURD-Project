import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddBook from './components/AddBook';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Update from './components/update';
import BookDetail from './components/bookDetail';
function App() {
  return (
    <>
    <Navbar />
    <BrowserRouter>
    <Routes>
      <Route path='/'Component={Home} />
      <Route path='/addbook' Component={AddBook} />
      <Route path='/update/:id' Component={Update} />
      <Route path='/view/:id' Component={BookDetail} />


    </Routes>
    </BrowserRouter>
    

    </>
  );
}

export default App;
