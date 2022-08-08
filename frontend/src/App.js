import './App.css';
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import Header from './components/Header';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import AddProduct from './screens/AddProduct';
import ListProductsScreen from './screens/ListProductsScreen';


function App() {
  return (
    <Router >
      <Header/>
      <main>
        <Routes>
          <Route path='/register' element={<RegisterScreen/>}/>
          <Route path='/login' element={<LoginScreen/>}/>
          <Route path='/addproduct' element={<AddProduct/>}/>
          <Route path='/' element={<ListProductsScreen/>}/>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
